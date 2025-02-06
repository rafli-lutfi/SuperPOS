package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.requests.CreateTransactionRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.requests.PayTransactionRequestDTO;
import com.github.rafli_lutfi.superpos.api.entities.Transaction;

public class TransactionRequestMapper {
    public static Transaction fromCreateTransactionRequestDTO(CreateTransactionRequestDTO requestDTO) {
        Transaction transaction = new Transaction();
        transaction.setTransactionDetails(requestDTO.getDetails().stream().map(
                transactionDetail -> TransactionDetailRequestMapper.fromCreateTransactionDetailRequestDTO(transactionDetail)
        ).toList());
        return transaction;
    }

    public static Transaction fromUpdateTransactionRequestDTO(PayTransactionRequestDTO requestDTO, String transactionId) {
        Transaction transaction = new Transaction();
        transaction.setId(transactionId);
        transaction.setTotalPay(requestDTO.getTotalPay());
        return transaction;
    }
}
