package com.pugnascotia.reactdemo.repositories;

import com.pugnascotia.reactdemo.model.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoriesRepository extends JpaRepository<SubCategory, Long> {

}
