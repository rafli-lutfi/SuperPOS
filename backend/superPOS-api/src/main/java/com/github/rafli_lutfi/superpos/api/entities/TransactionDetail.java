package com.github.rafli_lutfi.superpos.api.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Entity
@Table(name = "transaction_details")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TransactionDetail {
    @Id
    @SequenceGenerator(
            name = "transaction_detail_seq",
            sequenceName = "transaction_detail_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "transaction_detail_seq",
            strategy = GenerationType.SEQUENCE
    )
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Transaction transaction;

    @Transient
    private Long productId;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_price")
    private Double productPrice;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "sub_total")
    private Double subTotal;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Date createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Date updatedAt;
}
