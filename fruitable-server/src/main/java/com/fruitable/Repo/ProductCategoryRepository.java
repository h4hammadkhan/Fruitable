package com.fruitable.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.model.product.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{

}
