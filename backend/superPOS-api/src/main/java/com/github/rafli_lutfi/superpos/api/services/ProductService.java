package com.github.rafli_lutfi.superpos.api.services;

import com.github.rafli_lutfi.superpos.api.entities.*;
import com.github.rafli_lutfi.superpos.api.repository.ProductRepository;
import com.github.rafli_lutfi.superpos.api.repository.TransactionDetailRepository;
import com.github.rafli_lutfi.superpos.api.utils.customException.ProductDeletionNotAllowedException;
import com.github.rafli_lutfi.superpos.api.utils.customException.RecordAlreadyExistException;
import com.github.rafli_lutfi.superpos.api.utils.customException.RecordNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final TransactionDetailRepository transactionDetailRepository;

    public Page<Product> findAll(Integer page, Integer size, String sort, String order, String search, String category) {
        page = (page == null || page < 1) ? 0 : page - 1;
        size = (size == null || size < 1) ? 10 : size;

        sort = (sort == null || sort.isEmpty()) ? "name" : sort;
        Sort.Direction direction = (order != null && order.equalsIgnoreCase("asc"))
                ? Sort.Direction.ASC
                : Sort.Direction.DESC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort, "name"));

        if (search != null && !search.isEmpty() || category != null && !category.isEmpty()) {
            category = category != null ? category.toLowerCase() : null;

            return productRepository.searchProducts(search, category, pageable);
        }

        return productRepository.findAll(pageable);
    }

    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow(
                () -> new RecordNotFoundException("product with id " + id + " not found")
        );
    }

    @Transactional
    public Product save(Product product, Long categoryId) {
        boolean isProductNameExist = productRepository.findByNameIgnoreCase(product.getName()).isPresent();
        if (isProductNameExist) {
            throw new RecordAlreadyExistException("product with name " + product.getName() + " already exist");
        }

        Category category = categoryService.findById(categoryId);
        if (category == null) {
            throw new RecordNotFoundException("category with id " + categoryId + " not found");
        }

        product.setCategory(category);

        return productRepository.save(product);
    }

    @Transactional
    public void update(Product product, Long categoryId) {
        Product productToUpdate = productRepository.findById(product.getId()).orElseThrow(
                () -> new RecordNotFoundException("product with id " + product.getId() + " not found")
        );

        // update category
        if(categoryId != null && !productToUpdate.getCategory().getId().equals(categoryId)) {
            Category category = categoryService.findById(categoryId);
            if(category == null){
                throw new RecordNotFoundException("category with id " + categoryId + " not found");
            }
            productToUpdate.setCategory(category);
        }

        // update product name
        if(product.getName() != null && !product.getName().isBlank() && !product.getName().equalsIgnoreCase(productToUpdate.getName())) {
            productToUpdate.setName(product.getName());
        }

        // update product description
        if(product.getDescription() != null && !product.getDescription().isBlank() && !product.getDescription().equals(productToUpdate.getDescription())) {
            productToUpdate.setDescription(product.getDescription());
        }

        // update product price
        if(product.getPrice() != null && product.getPrice() >= 0 && !product.getPrice().equals(productToUpdate.getPrice())) {
            productToUpdate.setPrice(product.getPrice());
        }

        // update product stock
        if (product.getStock() != null && product.getStock() >= 0 && !product.getStock().equals(productToUpdate.getStock())) {
            productToUpdate.setStock(product.getStock());
        }

        // update image url
        if (product.getImageUrl() != null && !product.getImageUrl().equals(productToUpdate.getImageUrl())) {
            productToUpdate.setImageUrl(product.getImageUrl());
        }

        productRepository.save(productToUpdate);
    }

    public void delete(Long id) {
        boolean isProductEmpty = productRepository.findById(id).isEmpty();
        if (isProductEmpty) {
            throw new RecordNotFoundException("product with id " + id + " not found");
        }

        boolean hasTransactionDetail = transactionDetailRepository.existsByProductId(id);
        if(hasTransactionDetail) {
            throw new ProductDeletionNotAllowedException("Cannot delete product with id " + id + " because it is referenced in transaction details");
        }

        productRepository.deleteById(id);
    }
}
