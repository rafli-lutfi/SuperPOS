package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.responses.TransactionDetailResponseDTO;
import com.github.rafli_lutfi.superpos.api.entities.TransactionDetail;

public class TransactionDetailResponseMapper {
    public static TransactionDetailResponseDTO toTransactionDetailResponseDTO(TransactionDetail transactionDetail) {
        TransactionDetailResponseDTO responseDTO = new TransactionDetailResponseDTO();
        responseDTO.setId(transactionDetail.getId());
        responseDTO.setProductName(transactionDetail.getProduct().getName());
        responseDTO.setProductPrice(transactionDetail.getProductPrice());
        responseDTO.setQuantity(transactionDetail.getQuantity());
        responseDTO.setSubTotal(transactionDetail.getSubTotal());
        responseDTO.setImageUrl(transactionDetail.getImageUrl());
        return responseDTO;
    }
}
