package com.pugnascotia.reactdemo.services;

import com.pugnascotia.reactdemo.model.Category;

import java.util.List;

public interface CategoriesService {

	Category findById(Long id);

	Boolean switchStatus(Long id);

	void updateCategory(Category article);

	void deleteCategoryByName(Long id);

	List<Category> findAllCategories();
}
