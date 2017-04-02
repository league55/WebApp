package com.pugnascotia.reactdemo.repositories;

import com.pugnascotia.reactdemo.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {

	Iterable<Article> findByTitle(String title);

}
