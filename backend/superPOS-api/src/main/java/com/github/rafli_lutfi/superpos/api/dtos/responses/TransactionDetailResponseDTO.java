package com.github.rafli_lutfi.superpos.api.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionDetailResponseDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("product_name")
    private String productName;

    @JsonProperty("product_price")
    private Double productPrice;

    @JsonProperty("quantity")
    private Integer quantity;

    @JsonProperty("sub_total")
    private Double subTotal;

    @JsonProperty("image_url")
    private String imageUrl;
}
