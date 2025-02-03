package com.github.rafli_lutfi.superpos.api.dtos.requests;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayTransactionRequestDTO {
    @JsonProperty("total_pay")
    @Min(1)
    @NotNull
    private Double totalPay;
}
