package com.github.rafli_lutfi.superpos.api.repository;

import com.github.rafli_lutfi.superpos.api.entities.TransactionDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionDetailRepository extends JpaRepository<TransactionDetail, Long> {
    boolean existsByProductId(Long id);
}
