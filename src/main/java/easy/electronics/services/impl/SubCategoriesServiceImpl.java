package easy.electronics.services.impl;

import easy.electronics.services.SubCategoriesService;
import easy.electronics.model.SubCategory;
import easy.electronics.repositories.SubCategoriesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class SubCategoriesServiceImpl implements SubCategoriesService {

	@Autowired
	SubCategoriesRepository repository;

	@Override
	public SubCategory findByName(Long id) {
		return repository.findOne(id);
	}

	@Override
	public Boolean switchStatus(Long id) {
		SubCategory category = repository.findOne(id);
		category.setIsActive(!category.getIsActive());
		repository.save(category);
		return category.getIsActive();
	}

	@Override
	public void updateSubCategory(SubCategory subCategory) {
		repository.save(subCategory);
	}

	@Override
	public void deleteSubCategoryByName(Long id) {
		repository.delete(id);
	}
}
