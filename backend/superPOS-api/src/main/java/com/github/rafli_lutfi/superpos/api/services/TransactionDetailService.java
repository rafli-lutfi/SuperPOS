package com.github.rafli_lutfi.superpos.api.services;

import com.github.rafli_lutfi.superpos.api.entities.Product;
import com.github.rafli_lutfi.superpos.api.entities.Transaction;
import com.github.rafli_lutfi.superpos.api.entities.TransactionDetail;
import com.github.rafli_lutfi.superpos.api.repository.TransactionDetailRepository;
import com.github.rafli_lutfi.superpos.api.utils.customException.InsufficientStockException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TransactionDetailService {
    private final TransactionDetailRepository transactionDetailRepository;
    private final ProductService productService;

    @Transactional
    public TransactionDetail save(Transaction transaction, TransactionDetail transactionDetail) {
        Product product = productService.findById(transactionDetail.getProductId());

        if (product.getStock() < transactionDetail.getQuantity()) {
            throw new InsufficientStockException("insufficient stock");
        }

        transactionDetail.setTransaction(transaction);
        transactionDetail.setProductName(product.getName());
        transactionDetail.setProductPrice(product.getPrice());
        transactionDetail.setSubTotal(transactionDetail.getQuantity() * product.getPrice());
        transactionDetail.setImageUrl(product.getImageUrl());

        product.setStock(product.getStock() - transactionDetail.getQuantity());
        productService.update(product, null);

        return transactionDetailRepository.save(transactionDetail);
    }
}
