package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.requests.CreateTransactionDetailRequestDTO;
import com.github.rafli_lutfi.superpos.api.entities.Product;
import com.github.rafli_lutfi.superpos.api.entities.TransactionDetail;

public class TransactionDetailRequestMapper {
    public static TransactionDetail fromCreateTransactionDetailRequestDTO(CreateTransactionDetailRequestDTO requestDTO) {
        TransactionDetail transactionDetail = new TransactionDetail();
        transactionDetail.setProduct(Product.builder().id(requestDTO.getProductId()).build());
        transactionDetail.setQuantity(requestDTO.getQuantity());
        return transactionDetail;
    }
}
