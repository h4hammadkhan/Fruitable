package com.fruitable.Service.Impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.ProductRepository;
import com.fruitable.Service.ProductService;
import com.fruitable.fileResponse.ProductPagealeResponse;
import com.fruitable.model.User;
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
	public ProductPagealeResponse getAllProducts(Integer pageNumber, Integer pageSize) {
		
		Pageable p = PageRequest.of(pageNumber, pageSize);
		
		Page<Product> pagePost = this.productRepository.findAll(p);
		
		List<Product> allPost = pagePost.getContent();
		
		ProductPagealeResponse response = new ProductPagealeResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
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

	@Override
	public ProductPagealeResponse getProductsByUser(User user, Integer pageNumber, Integer pageSize) {
		Pageable p = PageRequest.of(pageNumber, pageSize);
		
		Page<Product> pagePost = this.productRepository.findByuser(user,p);
		
		List<Product> allPost = pagePost.getContent();
		
		ProductPagealeResponse response = new ProductPagealeResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
	}
		
}
