package com.ecommerce.productservice.service;

import com.ecommerce.productservice.model.Product;
import com.ecommerce.productservice.repository.ProductRepository;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class ProductCatalogService {

    private final ProductRepository productRepository;

    public ProductCatalogService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> findAll(String search, String category, String sort) {
        return productRepository.findAll().stream()
            .filter(product -> matchesSearch(product, search))
            .filter(product -> matchesCategory(product, category))
            .sorted(resolveSort(sort))
            .toList();
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public List<String> getCategories() {
        return productRepository.findAll().stream()
            .map(Product::category)
            .distinct()
            .sorted(String::compareToIgnoreCase)
            .toList();
    }

    private boolean matchesSearch(Product product, String search) {
        if (!StringUtils.hasText(search)) {
            return true;
        }
        String query = search.toLowerCase();
        return product.name().toLowerCase().contains(query)
            || product.description().toLowerCase().contains(query);
    }

    private boolean matchesCategory(Product product, String category) {
        if (!StringUtils.hasText(category) || "All".equalsIgnoreCase(category)) {
            return true;
        }
        return product.category().equalsIgnoreCase(category);
    }

    private Comparator<Product> resolveSort(String sort) {
        if ("price-asc".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Product::price);
        }
        if ("price-desc".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Product::price).reversed();
        }
        if ("name-asc".equalsIgnoreCase(sort)) {
            return Comparator.comparing(Product::name, String.CASE_INSENSITIVE_ORDER);
        }
        return Comparator.comparing(Product::id);
    }
}

