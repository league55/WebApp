package easy.electronics.services;

import java.util.List;

import easy.electronics.model.Category;

public interface CategoriesService {

	Category findById(String id);

	void increaseTimesUsed(String id);

	Boolean switchStatus(String id);

	void updateCategory(Category article);

	void deleteCategory(String id);

	List<Category> findAllCategories();
}
