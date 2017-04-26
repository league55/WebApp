package easy.electronics.services;

import easy.electronics.model.SubCategory;

public interface SubCategoriesService {

	SubCategory findByName(Long id);

	Boolean switchStatus(Long id);

	void updateSubCategory(SubCategory subCategory);

	void deleteSubCategoryByName(Long id);
}
