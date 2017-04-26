package easy.electronics.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import easy.electronics.model.Article;

@Repository
public interface ArticleRepository extends PagingAndSortingRepository<Article, Long> {

	Iterable<Article> findByTitle(String title);

}
