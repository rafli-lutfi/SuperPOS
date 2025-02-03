package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.requests.CreateTransactionDetailRequestDTO;
import com.github.rafli_lutfi.superpos.api.entities.TransactionDetail;

public class TransactionDetailRequestMapper {
    public static TransactionDetail fromCreateTransactionDetailRequestDTO(CreateTransactionDetailRequestDTO requestDTO) {
        TransactionDetail transactionDetail = new TransactionDetail();
        transactionDetail.setProductId(requestDTO.getProductId());
        transactionDetail.setQuantity(requestDTO.getQuantity());
        return transactionDetail;
    }
}
