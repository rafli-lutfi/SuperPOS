package com.github.rafli_lutfi.superpos.api.dtos.responses;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class TransactionResponseDTO {
    @JsonProperty("id")
    private Long id;

    @JsonProperty("total_amount")
    private Double totalAmount;

    @JsonProperty("total_pay")
    private Double totalPay;

    @JsonProperty("created_at")
    private Date createdAt;

    @JsonProperty("paid_at")
    private Date paidAt;

    @JsonProperty("details")
    private List<TransactionDetailResponseDTO> transactionDetails;
}
