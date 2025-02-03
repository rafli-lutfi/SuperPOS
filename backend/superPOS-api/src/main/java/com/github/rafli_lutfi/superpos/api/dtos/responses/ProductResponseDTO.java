package com.github.rafli_lutfi.superpos.api.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.util.StringUtils;

import java.util.List;

@Setter
@Getter
public class ProductResponseDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("category")
    private CategoryResponseDTO category;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("price")
    private Double price;

    @JsonProperty("stock")
    private Integer stock;

    @JsonProperty("image_url")
    private String imageUrl;
}
