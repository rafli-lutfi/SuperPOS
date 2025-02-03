package com.github.rafli_lutfi.superpos.api.utils.customException;

public class InsufficientPaymentException extends RuntimeException {
    public InsufficientPaymentException(String message) {
        super(message);
    }
}
