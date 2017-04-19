package com.pugnascotia.reactdemo.controllers;


import com.pugnascotia.reactdemo.model.Category;
import com.pugnascotia.reactdemo.services.CategoriesService;
import com.pugnascotia.reactdemo.services.SubCategoriesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoriesController {
	private static final Logger logger = LoggerFactory.getLogger(CategoriesController.class);

	@Autowired
	CategoriesService categoriesService;

	@Autowired
	SubCategoriesService subCategoriesService;

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity all() {
		List<Category> categories = categoriesService.findAllCategories();
		if (categories.isEmpty()) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(categories, HttpStatus.OK);
	}

	@RequestMapping(value = "/mode/{id}", method = RequestMethod.POST)
	public ResponseEntity<?> switchCategoryMode(@PathVariable Long id) {
		Category category = categoriesService.findById(id);
		Boolean newMode = categoriesService.switchStatus(id);
		logger.info("Updating Category {} mode to -> {}", category.getCategoryName(), newMode);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(value = "sub/mode/{id}", method = RequestMethod.POST)
	public ResponseEntity<?> switchSubCategoryMode(@PathVariable Long id) {
		Category category = categoriesService.findById(id);
		Boolean newMode = categoriesService.switchStatus(id);
		logger.info("Updating Category {} mode to -> {}", category.getCategoryName(), newMode);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> updateCategory(@RequestBody Category category) {
		logger.debug("Adding new Category");
		categoriesService.updateCategory(category);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
