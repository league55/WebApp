package easy.electronics.services.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import easy.electronics.model.Article;
import easy.electronics.services.ArticleSearchService;

@Service
@Transactional
public class ArticleSearchServiceImpl implements ArticleSearchService {
	private static final Logger LOG = LoggerFactory.getLogger(ArticleSearchServiceImpl.class);
	@PersistenceContext
	private EntityManager em;

	@Override
	public List<Article> search(String searchString) {
		FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(em);

		try {
			fullTextEntityManager
				.createIndexer( Article.class )
				.startAndWait();
		}
		catch (InterruptedException e) {
			e.printStackTrace();
		}

		LOG.info("------------------------------------------");
		LOG.info("Searching Article for phrase " + searchString + "'");

		// Create a Query Builder
		QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(Article.class).get();

		// Create a Lucene Full Text Query
		org.apache.lucene.search.Query luceneQuery = qb.bool()
			.must(qb.keyword().onFields("title", "content").matching(searchString).createQuery()).createQuery();

		Query fullTextQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, Article.class);
		//qb.keyword().onFields("title", "content").matching("1775").createQuery();
		// Run Query and print out results to console
		List<Article> result = (List<Article>) fullTextQuery.getResultList();

		// Log the Results
		LOG.info("Found Matching Books :" + result.size());
		for (Article a : result) {
			LOG.info(" - " + a);
		}

		fullTextEntityManager.close();
		return result;
	}
}
