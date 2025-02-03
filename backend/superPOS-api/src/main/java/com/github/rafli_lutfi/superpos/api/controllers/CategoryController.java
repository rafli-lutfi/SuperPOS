package com.github.rafli_lutfi.superpos.api.controllers;

import com.github.rafli_lutfi.superpos.api.dtos.mappers.CategoryRequestMapper;
import com.github.rafli_lutfi.superpos.api.dtos.mappers.CategoryResponseMapper;
import com.github.rafli_lutfi.superpos.api.dtos.requests.CreateCategoryRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.requests.UpdateCategoryRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.CategoryResponseDTO;
import com.github.rafli_lutfi.superpos.api.entities.Category;
import com.github.rafli_lutfi.superpos.api.services.CategoryService;
import com.github.rafli_lutfi.superpos.api.utils.customResponse.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllCategories() {
        List<Category> categories = categoryService.findAll();
        List<CategoryResponseDTO> responseDTO = CategoryResponseMapper.toListCategoryResponseDTO(categories);

        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("{categoryId}")
    public ResponseEntity<ApiResponse<?>> getCategoryById(@PathVariable(name = "categoryId") Long categoryId) {
        Category category = categoryService.findById(categoryId);
        CategoryResponseDTO responseDTO = CategoryResponseMapper.toCategoryResponseDTO(category);

        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createCategory(@RequestBody @Validated CreateCategoryRequestDTO requestDTO) {
        Category category = categoryService.save(CategoryRequestMapper.fromCreateCategoryRequestDTO(requestDTO));
        CategoryResponseDTO responseDTO = CategoryResponseMapper.toCategoryResponseDTO(category);

        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.CREATED.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @PutMapping("{categoryId}")
    public ResponseEntity<ApiResponse<?>> updateCategory(
            @PathVariable(name = "categoryId") Long categoryId,
            @RequestBody @Validated UpdateCategoryRequestDTO requestDTO)
    {
        categoryService.update(CategoryRequestMapper.fromUpdateCategoryRequestDTO(requestDTO), categoryId);

        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", null);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping("{categoryId}")
    public ResponseEntity<ApiResponse<?>> deleteCategory(@PathVariable(name = "categoryId") Long categoryId) {
        categoryService.delete(categoryId);

        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", null);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
