package com.github.rafli_lutfi.superpos.api.services;

import com.github.rafli_lutfi.superpos.api.entities.Category;
import com.github.rafli_lutfi.superpos.api.repository.CategoryRepository;
import com.github.rafli_lutfi.superpos.api.repository.ProductRepository;
import com.github.rafli_lutfi.superpos.api.utils.customException.CategoryNotEmptyException;
import com.github.rafli_lutfi.superpos.api.utils.customException.RecordAlreadyExistException;
import com.github.rafli_lutfi.superpos.api.utils.customException.RecordNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id){
        Category category = categoryRepository.findById(id).orElseThrow(
                () -> new RecordNotFoundException("category with id " + id + " not found")
        );

        category.setTotalRelatedProduct(categoryRepository.countTotalRelatedProductById(id));
        return category;
    }

    public Category save(Category category) {
        category.setName(category.getName().toLowerCase());

        boolean isCategoryNameExist = categoryRepository.findByName(category.getName()).isPresent();
        if(isCategoryNameExist){
            throw new RecordAlreadyExistException("category with name " + category.getName() + " already exist");
        }

        return categoryRepository.save(category);
    }

    @Transactional
    public void update(Category category, Long categoryId) {
        Category categoryToUpdate = findById(categoryId);

        if(category.getName() != null && !category.getName().isBlank() && !category.getName().toLowerCase().equals(categoryToUpdate.getName())){
            categoryToUpdate.setName(category.getName());
        }

        if(category.getDescription() != null && !category.getDescription().isBlank() && !category.getDescription().equals(categoryToUpdate.getDescription())){
            categoryToUpdate.setDescription(category.getDescription());
        }

        categoryRepository.save(categoryToUpdate);
    }

    public void delete(Long categoryId){
        boolean isCategoryEmpty = categoryRepository.findById(categoryId).isEmpty();
        if(isCategoryEmpty){
            throw new RecordNotFoundException("category with id " + categoryId + " not found");
        }

        if(categoryRepository.countTotalRelatedProductById(categoryId) > 0){
            throw new CategoryNotEmptyException("Cannot delete category with id " + categoryId + " because it has related products");
        }

        categoryRepository.deleteById(categoryId);
    }
}
