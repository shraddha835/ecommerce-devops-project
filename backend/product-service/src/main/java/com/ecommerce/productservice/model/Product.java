package com.ecommerce.productservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {

    @Id
    private Long id;
    private String name;
    private Integer price;
    private String description;
    private Integer stock;
    private String image;
    private String category;

    public Product() {}

    public Product(Long id, String name, Integer price, String description,
                   Integer stock, String image, String category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.stock = stock;
        this.image = image;
        this.category = category;
    }

    // Record-style accessors — keeps all existing service/controller code working
    public Long id() { return id; }
    public String name() { return name; }
    public Integer price() { return price; }
    public String description() { return description; }
    public Integer stock() { return stock; }
    public String image() { return image; }
    public String category() { return category; }

    // JavaBean-style getters — required for Jackson JSON serialization
    public Long getId() { return id; }
    public String getName() { return name; }
    public Integer getPrice() { return price; }
    public String getDescription() { return description; }
    public Integer getStock() { return stock; }
    public String getImage() { return image; }
    public String getCategory() { return category; }

    // Standard setters for Jackson/MongoDB deserialization
    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setPrice(Integer price) { this.price = price; }
    public void setDescription(String description) { this.description = description; }
    public void setStock(Integer stock) { this.stock = stock; }
    public void setImage(String image) { this.image = image; }
    public void setCategory(String category) { this.category = category; }
}

