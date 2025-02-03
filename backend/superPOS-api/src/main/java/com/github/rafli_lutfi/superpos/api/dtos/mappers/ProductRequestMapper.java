package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.requests.CreateProductRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.requests.UpdateProductRequestDTO;
import com.github.rafli_lutfi.superpos.api.entities.Product;

public class ProductRequestMapper {
    public static Product fromCreateProductRequestDTO(CreateProductRequestDTO requestDTO){
        Product product = new Product();
        product.setName(requestDTO.getName());
        product.setDescription(requestDTO.getDescription());
        product.setPrice(requestDTO.getPrice());
        product.setStock(requestDTO.getStock());
        product.setImageUrl(requestDTO.getImageUrl());
        return product;
    }

    public static Product fromUpdateProductRequestDTO(UpdateProductRequestDTO requestDTO, Long productId){
        Product product = new Product();
        product.setId(productId);
        product.setName(requestDTO.getName());
        product.setDescription(requestDTO.getDescription());
        product.setPrice(requestDTO.getPrice());
        product.setStock(requestDTO.getStock());
        product.setImageUrl(requestDTO.getImageUrl());
        return product;
    }
}
