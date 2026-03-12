package com.ecommerce.userservice.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userEmail;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String itemsJson;

    @Column(nullable = false)
    private Integer total;

    @Column(nullable = false)
    private String status = "Processing";

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public Order() {}

    public Order(String userEmail, String itemsJson, Integer total) {
        this.userEmail = userEmail;
        this.itemsJson = itemsJson;
        this.total = total;
        this.status = "Processing";
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getUserEmail() { return userEmail; }
    public String getItemsJson() { return itemsJson; }
    public Integer getTotal() { return total; }
    public String getStatus() { return status; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    public void setStatus(String status) { this.status = status; }
}
