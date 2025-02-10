package com.github.rafli_lutfi.superpos.api.repository;

import com.github.rafli_lutfi.superpos.api.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByName(String name);

    @Query("SELECT COUNT(*) FROM Product p WHERE p.category.id = :categoryId")
    Integer countTotalRelatedProductById(@Param("categoryId") Long id);
}
