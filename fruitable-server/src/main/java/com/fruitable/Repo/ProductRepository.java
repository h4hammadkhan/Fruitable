package com.fruitable.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.model.product.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

}
