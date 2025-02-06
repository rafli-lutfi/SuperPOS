package com.github.rafli_lutfi.superpos.api.repository;

import com.github.rafli_lutfi.superpos.api.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, String> {
}
