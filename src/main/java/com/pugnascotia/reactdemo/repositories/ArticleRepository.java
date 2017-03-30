package com.pugnascotia.reactdemo.repositories;

import com.pugnascotia.reactdemo.model.Article;

public interface ArticleRepository {

	Iterable<Article> findAll();

	Article save(Article article);

	Article find(Long id);
}
