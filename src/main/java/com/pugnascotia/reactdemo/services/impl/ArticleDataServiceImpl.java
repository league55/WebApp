package com.pugnascotia.reactdemo.services.impl;

import com.pugnascotia.reactdemo.model.Article;
import com.pugnascotia.reactdemo.repositories.ArticleRepository;
import com.pugnascotia.reactdemo.services.ArticleDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


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

	public List<Article> findAllArticles() {
		return articleRepository.findAll();
	}

	public boolean isArticleExist(Article article) {
		return findById(article.getArticleId()) != null;
	}
}
