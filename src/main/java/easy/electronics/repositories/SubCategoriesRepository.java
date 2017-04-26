package easy.electronics.repositories;

import easy.electronics.model.SubCategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoriesRepository extends JpaRepository<SubCategory, Long> {

}
