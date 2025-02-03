package com.github.rafli_lutfi.superpos.api.utils.customException;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String message) {
        super(message);
    }
}
