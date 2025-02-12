package com.github.rafli_lutfi.superpos.api.utils.customException;

public class ProductDeletionNotAllowedException extends RuntimeException {
    public ProductDeletionNotAllowedException(String message) {
        super(message);
    }
}
