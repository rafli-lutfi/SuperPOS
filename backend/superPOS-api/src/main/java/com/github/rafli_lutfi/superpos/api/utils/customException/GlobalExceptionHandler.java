package com.github.rafli_lutfi.superpos.api.utils.customException;

import com.github.rafli_lutfi.superpos.api.utils.customResponse.ApiResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    //BAD REQUEST
    @ExceptionHandler({
            RecordNotFoundException.class,
            InsufficientPaymentException.class,
            InsufficientStockException.class
    })
    public ResponseEntity<ApiResponse<?>> handleExceptionForBadRequest(Exception e) {
        ApiResponse<Object> response = new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> MethodArgumentNotValidException(MethodArgumentNotValidException e){
        List<String> errors = new ArrayList<>();
        e.getBindingResult().getFieldErrors().forEach(error -> {
            errors.add(error.getField() + " "+ error.getDefaultMessage());
        });

        String errorMessage = String.join(", ", errors);

        ApiResponse<Object> response = new ApiResponse<>(HttpStatus.BAD_REQUEST.value(), errorMessage, null);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // CONFLICT
    @ExceptionHandler({
            RecordAlreadyExistException.class,
            CategoryAndSubCategoryMismatchException.class,
            CategoryNotEmptyException.class,
            TransactionAlreadyPaidException.class,
    })
    public ResponseEntity<ApiResponse<?>> handlerExceptionForConflict(Exception e) {
        ApiResponse<Object> response = new ApiResponse<>(HttpStatus.CONFLICT.value(), e.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    // UNAUTHORIZED
    @ExceptionHandler({
            AccessDeniedException.class,
            BadCredentialsException.class,
            MalformedJwtException.class,
    })
    public ResponseEntity<ApiResponse<?>> handleExceptionForUnauthorized(Exception e) {
        ApiResponse<Object> response = new ApiResponse<>(HttpStatus.UNAUTHORIZED.value(), e.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
    }

    // FORBIDDEN
    @ExceptionHandler({
            AccountStatusException.class,
            SignatureException.class,
            ExpiredJwtException.class
    })
    public ResponseEntity<ApiResponse<?>> handleExceptionForForbidden(Exception e) {
        ApiResponse<Object> response = new ApiResponse<>(HttpStatus.FORBIDDEN.value(), e.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    // INTERNAL SERVER ERROR
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleExceptionForInternalServerError(Exception e) {
        log.error(e.getMessage(), e);
        ApiResponse<Object> response = new ApiResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage(), null);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
