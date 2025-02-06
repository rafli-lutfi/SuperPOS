package com.github.rafli_lutfi.superpos.api.controllers;

import com.github.rafli_lutfi.superpos.api.dtos.mappers.TransactionRequestMapper;
import com.github.rafli_lutfi.superpos.api.dtos.mappers.TransactionResponseMapper;
import com.github.rafli_lutfi.superpos.api.dtos.requests.CreateTransactionRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.requests.PayTransactionRequestDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.ListTransactionResponseDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.PaidTransactionResponseDTO;
import com.github.rafli_lutfi.superpos.api.dtos.responses.TransactionResponseDTO;
import com.github.rafli_lutfi.superpos.api.entities.Transaction;
import com.github.rafli_lutfi.superpos.api.services.TransactionService;
import com.github.rafli_lutfi.superpos.api.utils.customResponse.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping
    public ResponseEntity<ApiResponse<?>> getAllTransactions(
            @RequestParam(value = "page", defaultValue = "0") Integer page,
            @RequestParam(value = "size", defaultValue = "10") Integer size,
            @RequestParam(value = "sort", defaultValue = "createdAt") String sort,
            @RequestParam(value = "order", defaultValue = "desc") String order
    ) {
        Page<Transaction> transactions = transactionService.findAll(page, size, sort, order);
        ListTransactionResponseDTO responseDTO = TransactionResponseMapper.toListTransactionResponseDTO(transactions);

        ApiResponse<ListTransactionResponseDTO> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("{transactionId}")
    public ResponseEntity<ApiResponse<?>> getTransactionById(@PathVariable(name = "transactionId") String transactionId) {
        Transaction transaction = transactionService.findById(transactionId);
        TransactionResponseDTO responseDTO = TransactionResponseMapper.toTransactionResponseDTO(transaction);

        ApiResponse<TransactionResponseDTO> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<?>> createTransaction(@RequestBody @Validated CreateTransactionRequestDTO requestDTO) {
        Transaction transaction = transactionService.save(TransactionRequestMapper.fromCreateTransactionRequestDTO(requestDTO).getTransactionDetails());
        TransactionResponseDTO responseDTO = TransactionResponseMapper.toTransactionResponseDTO(transaction);

        ApiResponse<TransactionResponseDTO> apiResponse = new ApiResponse<>(HttpStatus.CREATED.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @PutMapping("{transactionId}/pay")
    public ResponseEntity<ApiResponse<?>> payTransaction(
            @PathVariable(name = "transactionId") String transactionId,
            @RequestBody @Validated PayTransactionRequestDTO requestDTO
    ){
        Double change = transactionService.update(transactionId, requestDTO.getTotalPay());
        PaidTransactionResponseDTO responseDTO = TransactionResponseMapper.toPaidTransactionResponseDTO(change);

        ApiResponse<PaidTransactionResponseDTO> apiResponse = new ApiResponse<>(HttpStatus.OK.value(), "success", responseDTO);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
