package com.fruitable.Service;

import java.util.List;
import java.util.Set;

import com.fruitable.fileResponse.ProductPagealeResponse;
import com.fruitable.model.User;
import com.fruitable.model.product.Product;

public interface ProductService {
	
	// add new product
	public Product addProduct(Product product);
	
	// update product
	public Product updateProduct(Product product);
	
	// update product Quantity
	public Set<Product> updateProductQty(Set<Product> pro);
	
	// get all products
	public ProductPagealeResponse getAllProducts(Integer pageNumber, Integer pageSize, String sortBy);
	
	// get all products by user
	public ProductPagealeResponse getProductsByUser(User user,Integer pageNumber, Integer pageSize,String sortBy);
	
	// get product by id
	public Product getProductById(Long productId);
	
	// delete product
	public void deleteProduct(Long productId);
	
	// get Product by categoryId
	public ProductPagealeResponse getProductByProductCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy);
	
	// search by product name
	public ProductPagealeResponse searchProduct(String productName, Integer pageNumber, Integer pageSize, String sortBy);

}
