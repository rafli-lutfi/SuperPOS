package com.github.rafli_lutfi.superpos.api.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListProductResponseDTO {
    @JsonProperty("page")
    private Integer page;

    @JsonProperty("size")
    private Integer size;

    @JsonProperty("total_page")
    private Integer totalPage;

    @JsonProperty("total_elements")
    private Integer totalElements;

    @JsonProperty("is_first")
    private Boolean isFirst;

    @JsonProperty("is_last")
    private Boolean isLast;

    @JsonProperty("products")
    private List<ProductResponseDTO> products;
}
