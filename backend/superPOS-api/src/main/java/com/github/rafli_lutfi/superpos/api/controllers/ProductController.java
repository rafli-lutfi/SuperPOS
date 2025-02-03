package com.github.rafli_lutfi.superpos.api.controllers;

import com.github.rafli_lutfi.superpos.api.dtos.mappers.ProductRequestMapper;
import com.github.rafli_lutfi.superpos.api.dtos.mappers.ProductResponseMapper;
import com.github.rafli_lutfi.superpos.api.dtos.requests.CreateProductRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.requests.UpdateProductRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.ListProductResponseDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.ProductResponseDTO;
import com.github.rafli_lutfi.superpos.api.entities.Product;
import com.github.rafli_lutfi.superpos.api.services.ProductService;
import com.github.rafli_lutfi.superpos.api.utils.customResponse.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllProduct(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam(value = "sort", defaultValue = "name") String sort,
            @RequestParam(value = "order", defaultValue = "asc") String order,
            @RequestParam(value = "search", required = false) String search,
            @RequestParam(value = "category", required = false) String category
    ) {
        Page<Product> products = productService.findAll(page, size, sort, order, search, category);
        ListProductResponseDTO responseDTO = ProductResponseMapper.toListProductResponseDTO(products);

        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("{productId}")
    public ResponseEntity<ApiResponse<?>> getProductById(
            @PathVariable(name = "productId") Long id
    ){
        Product product = productService.findById(id);
        ProductResponseDTO responseDTO = ProductResponseMapper.toProductResponseDTO(product);

        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> newProduct(@RequestBody @Validated CreateProductRequestDTO requestDTO) {
        Product product = productService.save(
                ProductRequestMapper.fromCreateProductRequestDTO(requestDTO),
                requestDTO.getCategoryId()
        );
        ProductResponseDTO responseDTO = ProductResponseMapper.toProductResponseDTO(product);

        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.CREATED.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @PutMapping("{productId}")
    public ResponseEntity<ApiResponse<?>> updateProduct(
            @PathVariable(name = "productId") Long productId,
            @RequestBody @Validated UpdateProductRequestDTO requestDTO
    ) {
        productService.update(
                ProductRequestMapper.fromUpdateProductRequestDTO(requestDTO, productId),
                requestDTO.getCategoryId()
        );
        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", null);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping("{productId}")
    public ResponseEntity<ApiResponse<?>> deleteProduct(@PathVariable(name = "productId") Long productId) {
        productService.delete(productId);
        ApiResponse<Object> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", null);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}