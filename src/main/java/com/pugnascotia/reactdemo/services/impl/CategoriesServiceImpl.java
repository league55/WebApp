package com.pugnascotia.reactdemo.services.impl;

import com.pugnascotia.reactdemo.model.Category;
import com.pugnascotia.reactdemo.repositories.CategoriesRepository;
import com.pugnascotia.reactdemo.services.CategoriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CategoriesServiceImpl implements CategoriesService {

	@Autowired
	CategoriesRepository repository;

	@Override
	public Category findById(Long id) {
		return repository.findOne(id);
	}

	@Override
	public Boolean switchStatus(Long id) {
		Category category = repository.findOne(id);
		category.setIsActive(!category.getIsActive());
		repository.save(category);
		return category.getIsActive();
	}

	@Override
	public void updateCategory(Category user) {
		repository.save(user);
	}

	@Override
	public void deleteCategoryByName(Long id) {
		repository.delete(id);
	}

	@Override
	public List<Category> findAllCategories() {
		return repository.findAll();
	}
}
