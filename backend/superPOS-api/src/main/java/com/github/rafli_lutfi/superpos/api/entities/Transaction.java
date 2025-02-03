package com.github.rafli_lutfi.superpos.api.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "transactions")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Transaction {
    @Id
    @SequenceGenerator(
            name = "transaction_seq",
            sequenceName = "transaction_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "transaction_seq",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Column(name = "total_pay")
    private Double totalPay;

    @OneToMany(mappedBy = "transaction")
    private List<TransactionDetail> transactionDetails;

    @Column(name = "paid_at")
    private Date paidAt;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Date updatedAt;
}
