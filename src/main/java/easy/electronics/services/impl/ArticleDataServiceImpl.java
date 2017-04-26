package easy.electronics.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import easy.electronics.model.Article;
import easy.electronics.repositories.ArticleRepository;
import easy.electronics.services.ArticleDataService;

@Service("articleDataServiceImpl")
@Transactional
public class ArticleDataServiceImpl implements ArticleDataService {

	@Autowired
	private ArticleRepository articleRepository;

	public Article findById(Long id) {
		return articleRepository.findOne(id);
	}

	public Iterable<Article> findByTitle(String title) {
		return articleRepository.findByTitle(title);
	}

	public void saveArticle(Article article) {
		articleRepository.save(article);
	}

	public void updateArticle(Article article) {
		saveArticle(article);
	}

	public void deleteArticleById(Long id) {
		articleRepository.delete(id);
	}

	public Iterable<Article> findAllArticles() {
		return articleRepository.findAll();
	}

	public List<Article> findArticles(Pageable pageable) {
		return articleRepository.findAll(pageable).getContent();
	}

	public boolean isArticleExist(Article article) {
		return findById(article.getArticleId()) != null;
	}
}
