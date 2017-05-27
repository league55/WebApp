package easy.electronics.services;

import java.util.List;

import easy.electronics.model.Article;

public interface ArticleSearchService {
	List<Article> search(String searchString);
}
