package easy.electronics.repositories.imlp;

import org.springframework.stereotype.Repository;

@Repository
public class InMemoryArticleRepository {

//	private static AtomicLong counter = new AtomicLong();
//
//	private final ConcurrentMap<Long, Article> comments = new ConcurrentHashMap<>();
//
//	@PostConstruct
//	public void populateRepository() {
//		this.save(new Article("Brian Clozel", "This is a test!"));
//		this.save(new Article("Stéphane Nicoll", "This is a test too!"));
//	}
//
//	@Override
//	public Article save(Article article) {
//		Long id = article.getId();
//		if (id == null) {
//			id = counter.incrementAndGet();
//			article.setId(id);
//		}
//		this.comments.put(id, article);
//		return article;
//	}
//
//	@Override
//	public Article find(Long id) {
//		return this.comments.get(id);
//	}
//
//	@Override
//	public Iterable<Article> findAll() {
//		return this.comments.values();
//	}
}
