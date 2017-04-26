package easy.electronics.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import easy.electronics.model.Category;
import easy.electronics.repositories.CategoriesRepository;
import easy.electronics.services.CategoriesService;

@Service
@Transactional
public class CategoriesServiceImpl implements CategoriesService {

	@Autowired
	CategoriesRepository repository;

	@Override
	public Category findById(String id) {
		return repository.findOne(id);
	}

	@Override
	public Boolean switchStatus(String id) {
		Category category = repository.findOne(id);
		category.setIsActive(!category.getIsActive());
		repository.save(category);
		return category.getIsActive();
	}

	@Override
	public void updateCategory(Category cat) {
		repository.save(cat);
	}

	@Override
	public void deleteCategory(String id) {
		repository.delete(id);
	}

	@Override
	public List<Category> findAllCategories() {
		return repository.findAll();
	}
}
