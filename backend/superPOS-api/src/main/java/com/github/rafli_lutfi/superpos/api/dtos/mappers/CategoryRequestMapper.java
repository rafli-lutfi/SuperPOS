package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.requests.CreateCategoryRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.requests.UpdateCategoryRequestDTO;
import com.github.rafli_lutfi.superpos.api.entities.Category;

public class CategoryRequestMapper {
    public static Category fromCreateCategoryRequestDTO(CreateCategoryRequestDTO requestDTO) {
        Category category = new Category();
        category.setName(requestDTO.getName());
        category.setDescription(requestDTO.getDescription());
        return category;
    }

    public static Category fromUpdateCategoryRequestDTO(UpdateCategoryRequestDTO requestDTO) {
        Category category = new Category();
        category.setName(requestDTO.getName());
        category.setDescription(requestDTO.getDescription());
        return category;
    }
}
