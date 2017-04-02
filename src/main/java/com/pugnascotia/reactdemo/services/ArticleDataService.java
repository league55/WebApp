package com.pugnascotia.reactdemo.services;

import com.pugnascotia.reactdemo.model.Article;

import java.util.List;

public interface ArticleDataService {

	Article findById(Long id);

	Iterable<Article> findByTitle(String title);

	void saveArticle(Article article);

	void updateArticle(Article article);

	void deleteArticleById(Long id);

	List<Article> findAllArticles();

	boolean isArticleExist(Article user);
}
