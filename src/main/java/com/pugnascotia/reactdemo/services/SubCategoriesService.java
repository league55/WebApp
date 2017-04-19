package com.pugnascotia.reactdemo.services;

import com.pugnascotia.reactdemo.model.SubCategory;

public interface SubCategoriesService {

	SubCategory findByName(Long id);

	Boolean switchStatus(Long id);

	void updateSubCategory(SubCategory subCategory);

	void deleteSubCategoryByName(Long id);
}
