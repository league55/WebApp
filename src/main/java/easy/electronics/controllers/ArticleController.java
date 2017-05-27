package easy.electronics.controllers;

import static org.springframework.data.domain.Sort.Direction.DESC;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import easy.electronics.controllers.errors.CustomErrorType;
import easy.electronics.model.Article;
import easy.electronics.model.User;
import easy.electronics.services.ArticleDataService;
import easy.electronics.services.ArticleSearchService;
import easy.electronics.services.CategoriesService;
import easy.electronics.services.UserService;
import lombok.Data;

/**
 * Handles requests for the "add a comment" page. This is handled
 * by our UI stack without any additional context.
 */

@RestController
@RequestMapping("/article")
public class ArticleController {
	private static final Logger logger = LoggerFactory.getLogger(ArticleController.class);

	@Autowired
	private ArticleDataService articleDataService;

	@Autowired
	private ArticleSearchService articleSearchService;

	@Autowired
	private UserService userService;

	@Autowired
	private CategoriesService categoriesService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity listAllArticles(@PageableDefault(sort = "modifyDate", direction = DESC, value = 1) Pageable pageable) {
		List<Article> articles = articleDataService.findArticles(pageable);
		if (articles.isEmpty()) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(articles, HttpStatus.OK);
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public ResponseEntity searchArticles(@RequestParam("searchQuery") String searchQuery) {
		List<Article> articles = articleSearchService.search(searchQuery);
		if (articles.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(articles, HttpStatus.OK);
	}

	@RequestMapping(value = "/category/{categoryId}", method = RequestMethod.GET)
	public ResponseEntity listAllCategoryArticles(@PageableDefault(sort = "modifyDate", direction = DESC, value = 1) Pageable pageable,
		@PathVariable("categoryId") String categoryId) {
		List<Article> articles = articleDataService.findArticles(categoryId, pageable);

		if (articles.isEmpty()) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(articles, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<?> getArticle(@PathVariable("id") long id) {
		logger.info("Fetching Article with id {}", id);
		Article article = articleDataService.findById(id);
		if (article == null) {
			logger.error("Article with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Article with id " + id
				+ " not found"), HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(article, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> createArticle(@RequestBody RequestWrapper wrapper, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Article : {}", wrapper.getArticle().getTitle());
		Article article = wrapper.getArticle();
		User author = userService.findByUsername(wrapper.getUserName());

		article.setAuthor(author);
		categoriesService.increaseTimesUsed(article.getCategoryId());
		articleDataService.saveArticle(article);

		logger.info("Article {} was saved", wrapper.getArticle().getTitle());
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("article/{id}").buildAndExpand(article.getArticleId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateArticle(@PathVariable("id") long id, @RequestBody RequestWrapper wrapper) {
		logger.info("Updating Article with id {}", id);

		Article currentArticle = articleDataService.findById(id);
		Article newArticle = wrapper.getArticle();

		if (currentArticle == null) {
			User author = userService.findByUsername(wrapper.getUserName());
			newArticle.setAuthor(author);
			logger.error("Article was not fount, updating existing", id);
			articleDataService.saveArticle(newArticle);
			categoriesService.increaseTimesUsed(newArticle.getCategoryId());

			return new ResponseEntity<>(newArticle, HttpStatus.OK);
		}

		currentArticle.setTitle(newArticle.getTitle());
		currentArticle.setContent(newArticle.getContent());
		currentArticle.setStatus(newArticle.getStatus());

		articleDataService.updateArticle(currentArticle);
		return new ResponseEntity<>(currentArticle, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteArticle(@PathVariable("id") long id) {
		logger.info("Fetching & Deleting Article with id {}", id);

		Article article = articleDataService.findById(id);
		if (article == null) {
			logger.error("Unable to delete. Article with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to delete. Article with id " + id + " not found."),
				HttpStatus.NOT_FOUND);
		}
		articleDataService.deleteArticleById(id);
		return new ResponseEntity<Article>(HttpStatus.NO_CONTENT);
	}

	//	@RequestMapping(value = "/add", method = GET)
	//    public String index(Model model, HttpServletRequest request) {
	//		populateModel(model, request);
	//        return "index";
	//    }
	@Data
	public static class RequestWrapper {
		public RequestWrapper() {
		}

		private Article article;
		private String userName;
	}
}
