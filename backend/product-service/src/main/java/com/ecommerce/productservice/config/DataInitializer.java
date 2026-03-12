package com.ecommerce.productservice.config;

import com.ecommerce.productservice.model.Product;
import com.ecommerce.productservice.repository.ProductRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner seedProducts(ProductRepository repository, ObjectMapper objectMapper) {
        return args -> {
            if (repository.count() == 0) {
                try (InputStream inputStream = new ClassPathResource("products.json").getInputStream()) {
                    Product[] products = objectMapper.readValue(inputStream, Product[].class);
                    repository.saveAll(Arrays.asList(products));
                    System.out.println("Seeded " + products.length + " products to MongoDB");
                }
            }
        };
    }
}
