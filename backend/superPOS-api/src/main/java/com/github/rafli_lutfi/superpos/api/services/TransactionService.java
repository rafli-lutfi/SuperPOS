package com.github.rafli_lutfi.superpos.api.services;

import com.github.rafli_lutfi.superpos.api.entities.Transaction;
import com.github.rafli_lutfi.superpos.api.entities.TransactionDetail;
import com.github.rafli_lutfi.superpos.api.repository.TransactionDetailRepository;
import com.github.rafli_lutfi.superpos.api.repository.TransactionRepository;
import com.github.rafli_lutfi.superpos.api.utils.customException.InsufficientPaymentException;
import com.github.rafli_lutfi.superpos.api.utils.customException.RecordNotFoundException;
import com.github.rafli_lutfi.superpos.api.utils.customException.TransactionAlreadyPaidException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final TransactionDetailService transactionDetailService;

    public Page<Transaction> findAll(Integer page, Integer size, String sort, String order) {
        page = page == null || page < 1 ? 0 : page - 1;
        size = size == null || size < 1 ? 10 : size;

        sort = sort == null || sort.isEmpty() ? "id" : sort;
        Sort.Direction direction = order != null && order.equalsIgnoreCase("desc") ?
                Sort.Direction.DESC : Sort.Direction.ASC;

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));
        return transactionRepository.findAll(pageable);
    }

    public Transaction findById(String id) {
        return transactionRepository.findById(id).orElseThrow(
                () -> new RecordNotFoundException("transaction with id " + id + " not found")
        );
    }

    @Transactional
    public Transaction save(List<TransactionDetail> transactionDetails) {
        Transaction transaction = new Transaction();
        transaction = transactionRepository.save(transaction);

        Double totalAmount = 0.0;
        List<TransactionDetail> transactionDetailList = new ArrayList<>(transactionDetails);
        for (TransactionDetail transactionDetail : transactionDetails) {
            TransactionDetail savedTransactionDetail = transactionDetailService.save(transaction, transactionDetail);
            totalAmount += savedTransactionDetail.getSubTotal();
            transactionDetailList.add(savedTransactionDetail);
        }

        transaction.setTotalAmount(totalAmount);
        transaction.setTransactionDetails(transactionDetailList);

        return transactionRepository.save(transaction);
    }

    @Transactional
    public Double update(String TransactionId, Double totalPay){
        Transaction transactionToUpdate = transactionRepository.findById(TransactionId).orElseThrow(
                () -> new RecordNotFoundException("transaction with id " + TransactionId + " not found")
        );

        if (transactionToUpdate.getPaidAt() != null) {
            throw new TransactionAlreadyPaidException("transaction with id " + TransactionId + " already paid");
        }

        if (totalPay < transactionToUpdate.getTotalAmount()) {
            throw new InsufficientPaymentException("payment is insufficient");
        }

        transactionToUpdate.setTotalPay(totalPay);
        transactionToUpdate.setPaidAt(new Date());
        transactionRepository.save(transactionToUpdate);

        return totalPay - transactionToUpdate.getTotalAmount();
    }
}
