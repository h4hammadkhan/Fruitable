package com.fruitable.Service;

import java.util.Set;

import com.fruitable.model.product.ProductCategory;

public interface ProductCategoryService {
	
	// add category
	public ProductCategory addCategory(ProductCategory category);
		
	// update category
	public ProductCategory updateCategory(ProductCategory category);
	
	// get all categories
	public Set<ProductCategory> getCategories();
	
	// get category by id
	public ProductCategory getCategoryById(long categoryId);
	
	// delete category
	public void deleteCategory(long catagoryId);
	
}
