package com.pugnascotia.reactdemo.articles;

public interface ArticleRepository {

	Iterable<Article> findAll();

	Article save(Article article);

	Article find(Long id);
}
