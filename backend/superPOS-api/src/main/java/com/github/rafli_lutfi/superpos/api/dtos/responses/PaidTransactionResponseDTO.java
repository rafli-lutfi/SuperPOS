package com.github.rafli_lutfi.superpos.api.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PaidTransactionResponseDTO {
    @JsonProperty("change")
    private Double change;
}
