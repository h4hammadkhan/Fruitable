package com.fruitable.Repo;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.model.User;
import com.fruitable.model.product.Product;


public interface ProductRepository extends JpaRepository<Product, Long>{
	
	//get all products by user
	Page<Product> findByuser(User user, Pageable p);

}
