package com.fruitable.Service.Impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.ProductCategoryRepository;
import com.fruitable.Service.ProductCategoryService;
import com.fruitable.model.product.ProductCategory;

@Service
public class ProductCategoryServiceImpl implements ProductCategoryService{

	
	@Autowired
	private ProductCategoryRepository categoryRepository;

	@Override
	public ProductCategory addCategory(ProductCategory category) {
		return this.categoryRepository.save(category);
	}

	@Override
	public ProductCategory updateCategory(ProductCategory category) {
		return this.categoryRepository.save(category);
	}

	@Override
	public Set<ProductCategory> getCategories() {
		return new HashSet<>(this.categoryRepository.findAll());
	}

	@Override
	public ProductCategory getCategoryById(long categoryId) {
		return this.categoryRepository.findById(categoryId).get();
	}

	@Override
	public void deleteCategory(long catagoryId) {
		ProductCategory category = new  ProductCategory();
		category.setCategoryId(catagoryId);
		this.categoryRepository.delete(category);
		
		
	}
	
	
}
