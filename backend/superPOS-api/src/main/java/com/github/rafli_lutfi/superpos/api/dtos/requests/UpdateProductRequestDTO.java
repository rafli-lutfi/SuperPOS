package com.github.rafli_lutfi.superpos.api.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class UpdateProductRequestDTO {
    @JsonProperty("category_id")
    @Min(value = 1)
    private Long categoryId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("price")
    @Min(value = 0)
    private Double price;

    @JsonProperty("stock")
    private Integer stock;

    @JsonProperty("image_url")
    private String imageUrl;
}

