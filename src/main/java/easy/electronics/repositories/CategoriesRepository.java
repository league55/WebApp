package easy.electronics.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import easy.electronics.model.Category;

@Repository
public interface CategoriesRepository extends JpaRepository<Category, String> {

}
