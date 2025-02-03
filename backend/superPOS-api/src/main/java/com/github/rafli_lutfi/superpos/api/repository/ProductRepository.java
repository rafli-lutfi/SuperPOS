package com.github.rafli_lutfi.superpos.api.repository;

import com.github.rafli_lutfi.superpos.api.entities.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByName(String name);
    Page<Product> findByCategoryName(String categoryName, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.category.id = :categoryId")
    Optional<List<Product>> findByCategoryId(@Param("categoryId") Long id);

    @Transactional
    @Modifying
    @Query("UPDATE Product p SET p.category = NULL WHERE p.category.id = :categoryId")
    void detachCategoryFromProduct(@Param("categoryId") Long categoryId);

    @Query("SELECT p FROM Product p WHERE " +
            "(COALESCE(:search, '') = '' OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))) " +
            "AND (COALESCE(:category, '') = '' OR p.category.name = :category)"
    )
    Page<Product> searchProducts(
            @Param("search") String search,
            @Param("category") String category,
            Pageable pageable);
}
