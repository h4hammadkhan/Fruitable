package com.fruitable.Service;

import java.util.Set;

import com.fruitable.model.product.Product;

public interface ProductService {
	
	// add new product
	public Product addProduct(Product product);
	
	// update product
	public Product updateProduct(Product product);
	
	// get all products
	public Set<Product> getAllProducts();
	
	// get product by id
	public Product getProductById(Long productId);
	
	// delete product
	public void deleteProduct(Long productId);

}
