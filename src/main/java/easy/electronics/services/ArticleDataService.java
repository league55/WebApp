package easy.electronics.services;

import java.util.List;

import org.springframework.data.domain.Pageable;

import easy.electronics.model.Article;

public interface ArticleDataService {

	Article findById(Long id);

	Iterable<Article> findByTitle(String title);

	void saveArticle(Article article);

	void updateArticle(Article article);

	void deleteArticleById(Long id);

	Iterable<Article> findAllArticles();

	List<Article> findArticles(Pageable pageable);

	boolean isArticleExist(Article user);
}
