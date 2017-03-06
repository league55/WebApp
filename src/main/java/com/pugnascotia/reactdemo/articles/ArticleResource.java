package com.pugnascotia.reactdemo.articles;

import java.util.List;
import javax.inject.Inject;

import com.pugnascotia.reactdemo.utils.Functions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Handles creating new articles and fetching all articles via AJAX.
 */

@RestController
@RequestMapping(value = "/api", produces = APPLICATION_JSON_VALUE)
@Slf4j
public class ArticleResource {

	private final ArticleRepository repository;

	@Inject
	public ArticleResource(ArticleRepository repository) {
		this.repository = repository;
	}

	@RequestMapping(path = "/articles", method = POST)
	public Article add(@RequestBody Article article) {
		log.info("{}", article);
		return repository.save(article);
	}

	@RequestMapping(path = "/articles", method = GET)
	public List<Article> comments() {
		// You shouldn't do this in a real app - you should page the data!
		return Functions.map(repository.findAll(), c -> c);
	}
}
