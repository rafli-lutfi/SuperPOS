package com.github.rafli_lutfi.superpos.api.dtos.mappers;

import com.github.rafli_lutfi.superpos.api.dtos.responses.ListTransactionResponseDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.PaidTransactionResponseDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.TransactionResponseDTO;
import com.github.rafli_lutfi.superpos.api.entities.Transaction;
import org.springframework.data.domain.Page;

public class TransactionResponseMapper {
    public static TransactionResponseDTO toTransactionResponseDTO(Transaction transaction) {
        TransactionResponseDTO transactionResponseDTO = new TransactionResponseDTO();
        transactionResponseDTO.setId(transaction.getId());
        transactionResponseDTO.setTotalAmount(transaction.getTotalAmount());
        transactionResponseDTO.setTotalPay(transaction.getTotalPay());
        transactionResponseDTO.setCreatedAt(transaction.getCreatedAt());
        transactionResponseDTO.setPaidAt(transaction.getPaidAt());
        transactionResponseDTO.setTransactionDetails(transaction.getTransactionDetails().stream().map(
                transactionDetail -> TransactionDetailResponseMapper.toTransactionDetailResponseDTO(transactionDetail)
        ).toList());
        return transactionResponseDTO;
    }

    public static ListTransactionResponseDTO toListTransactionResponseDTO(Page<Transaction> transactions) {
        ListTransactionResponseDTO responseDTO = new ListTransactionResponseDTO();
        responseDTO.setPage(transactions.getNumber());
        responseDTO.setSize(transactions.getSize());
        responseDTO.setTotalPage(transactions.getTotalPages());
        responseDTO.setTotalElements(transactions.getNumberOfElements());
        responseDTO.setIsFirst(transactions.isFirst());
        responseDTO.setIsLast(transactions.isLast());
        responseDTO.setTransactions(transactions.getContent().stream().map(
                transaction -> {
                    TransactionResponseDTO transactionResponseDTO = new TransactionResponseDTO();
                    transactionResponseDTO.setId(transaction.getId());
                    transactionResponseDTO.setTotalAmount(transaction.getTotalAmount());
                    transactionResponseDTO.setTotalPay(transaction.getTotalPay());
                    transactionResponseDTO.setCreatedAt(transaction.getCreatedAt());
                    return transactionResponseDTO;
                }
        ).toList());

        return responseDTO;
    }

    public static PaidTransactionResponseDTO toPaidTransactionResponseDTO(Double change) {
        PaidTransactionResponseDTO responseDTO = new PaidTransactionResponseDTO();
        responseDTO.setChange(change);
        return responseDTO;
    }
}
