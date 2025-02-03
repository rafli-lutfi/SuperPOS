package com.github.rafli_lutfi.superpos.api.utils.customException;

public class TransactionAlreadyPaidException extends RuntimeException {
    public TransactionAlreadyPaidException(String message) {
        super(message);
    }
}
