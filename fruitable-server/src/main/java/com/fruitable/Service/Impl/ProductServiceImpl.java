package com.fruitable.Service.Impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.ProductRepository;
import com.fruitable.Service.ProductService;
import com.fruitable.model.product.Product;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository productRepository;

	
	@Override
	public Product addProduct(Product product) {
		return this.productRepository.save(product);
	}

	@Override
	public Product updateProduct(Product product) {
		return this.productRepository.save(product);
	}

	@Override
	public Set<Product> getAllProducts() {
		return new HashSet<>(this.productRepository.findAll());
	}

	@Override
	public Product getProductById(Long productId) {
		return this.productRepository.findById(productId).get();
	}

	@Override
	public void deleteProduct(Long productId) {
		Product product = new Product();
		product.setProductId(productId);
		this.productRepository.delete(product);
		
	}
		
}
