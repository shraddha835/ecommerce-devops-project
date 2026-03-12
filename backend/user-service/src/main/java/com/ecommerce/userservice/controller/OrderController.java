package com.ecommerce.userservice.controller;

import com.ecommerce.userservice.model.Order;
import com.ecommerce.userservice.repository.OrderRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "http://localhost:3002"})
public class OrderController {

    private final OrderRepository orderRepository;
    private final ObjectMapper objectMapper;

    public OrderController(OrderRepository orderRepository, ObjectMapper objectMapper) {
        this.orderRepository = orderRepository;
        this.objectMapper = objectMapper;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> payload) {
        String userEmail = (String) payload.get("userEmail");
        Object items = payload.get("items");
        Number total = (Number) payload.get("total");

        if (userEmail == null || items == null || total == null) {
            return ResponseEntity.badRequest().body("userEmail, items and total are required");
        }

        try {
            String itemsJson = objectMapper.writeValueAsString(items);
            Order order = new Order(userEmail, itemsJson, total.intValue());
            Order saved = orderRepository.save(order);
            return ResponseEntity.ok(Map.of(
                "id", saved.getId(),
                "status", saved.getStatus(),
                "message", "Order placed successfully"
            ));
        } catch (JsonProcessingException e) {
            return ResponseEntity.internalServerError().body("Failed to process order");
        }
    }

    @GetMapping
    public ResponseEntity<?> getOrders(@RequestParam String email) {
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body("email parameter is required");
        }
        List<Order> orders = orderRepository.findByUserEmailOrderByCreatedAtDesc(email);
        List<Map<String, Object>> result = orders.stream().map(order -> {
            Object items;
            try {
                items = objectMapper.readValue(order.getItemsJson(), Object.class);
            } catch (JsonProcessingException e) {
                items = List.of();
            }
            return Map.<String, Object>of(
                "id", order.getId(),
                "userEmail", order.getUserEmail(),
                "items", items,
                "total", order.getTotal(),
                "status", order.getStatus(),
                "createdAt", order.getCreatedAt().toString()
            );
        }).toList();
        return ResponseEntity.ok(result);
    }
}
