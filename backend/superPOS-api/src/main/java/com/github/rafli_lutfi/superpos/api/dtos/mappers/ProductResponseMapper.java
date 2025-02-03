package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.responses.ListProductResponseDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.ProductResponseDTO;
import com.github.rafli_lutfi.superpos.api.entities.Product;
import org.springframework.data.domain.Page;

public class ProductResponseMapper {
    public static ProductResponseDTO toProductResponseDTO(Product product) {
        ProductResponseDTO responseDTO = new ProductResponseDTO();
        responseDTO.setId(product.getId());
        if (product.getCategory() != null) {
            responseDTO.setCategory(CategoryResponseMapper.toCategoryResponseDTO(product.getCategory()));
        }
        responseDTO.setName(product.getName());
        responseDTO.setPrice(product.getPrice());
        responseDTO.setDescription(product.getDescription());
        responseDTO.setPrice(product.getPrice());
        responseDTO.setStock(product.getStock());
        responseDTO.setImageUrl(product.getImageUrl());

        return responseDTO;
    }

    public static ListProductResponseDTO toListProductResponseDTO(Page<Product> products) {
        ListProductResponseDTO responseDTO = new ListProductResponseDTO();
        responseDTO.setSize(products.getSize());
        responseDTO.setPage(products.getNumber() + 1);
        responseDTO.setTotalElements(products.getNumberOfElements());
        responseDTO.setTotalPage(products.getTotalPages());
        responseDTO.setIsFirst(products.isFirst());
        responseDTO.setIsLast(products.isLast());
        responseDTO.setProducts(products.getContent().stream().map(
                product -> toProductResponseDTO(product)
        ).toList());

        return responseDTO;
    }
}
