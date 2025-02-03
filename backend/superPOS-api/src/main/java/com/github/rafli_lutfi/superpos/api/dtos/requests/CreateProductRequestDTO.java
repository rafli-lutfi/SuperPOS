package com.github.rafli_lutfi.superpos.api.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateProductRequestDTO {
    @JsonProperty("category_id")
    @Min(value = 1)
    @NotNull
    private Long categoryId;

    @JsonProperty("name")
    @NotBlank
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("price")
    @NotNull
    private Double price;

    @JsonProperty("stock")
    @Min(value = 0)
    @NotNull
    private Integer stock;

    @JsonProperty("image_url")
    private String imageUrl;
}
