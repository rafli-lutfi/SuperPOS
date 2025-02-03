package com.github.rafli_lutfi.superpos.api.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTransactionDetailRequestDTO {
    @JsonProperty("product_id")
    @Min(0)
    @NotNull
    private Long productId;

    @JsonProperty("quantity")
    @Min(1)
    @NotNull
    private Integer quantity;
}
