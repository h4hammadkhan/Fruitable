package com.fruitable.Repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.model.User;
import com.fruitable.model.product.Product;
import com.fruitable.model.product.ProductCategory;


public interface ProductRepository extends JpaRepository<Product, Long>{
	
	//get all products by user
	Page<Product> findByuser(User user, Pageable p);
	
	// get by productCategory
	public Page<Product> findByProductCategory(ProductCategory category, Pageable p);
	
	// search by keyword containing in name
	public Page<Product> findByProductNameContaining(String productName, Pageable p);
	

}
