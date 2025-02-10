package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.responses.CategoryResponseDTO;
import com.github.rafli_lutfi.superpos.api.entities.Category;

import java.util.List;

public class CategoryResponseMapper {
    public static CategoryResponseDTO toCategoryResponseDTO(Category category) {
        CategoryResponseDTO responseDTO = new CategoryResponseDTO();
        responseDTO.setId(category.getId());
        responseDTO.setName(category.getName());
        responseDTO.setDescription(category.getDescription());
        responseDTO.setTotalRelatedProduct(category.getTotalRelatedProduct());

        return responseDTO;
    }

    public static List<CategoryResponseDTO> toListCategoryResponseDTO(List<Category> categories) {
        return categories.stream().map(
                category -> toCategoryResponseDTO(category)
        ).toList();
    }
}
