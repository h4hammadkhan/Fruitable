package com.fruitable.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fruitable.Service.ProductCategoryService;
import com.fruitable.model.product.ProductCategory;

@RestController
@CrossOrigin("*")
@RequestMapping("/category")
public class ProductCategoryController {

	@Autowired
	private ProductCategoryService categoryService;
	
	// add new category
	@PostMapping("/")
	public ProductCategory addNewCategory(@RequestBody ProductCategory productCategory) {
		return this.categoryService.addCategory(productCategory);
	}
	
	// update category
	@PostMapping("/update")
	public ProductCategory updateCategory(@RequestBody ProductCategory productCategory) {
		return this.categoryService.updateCategory(productCategory);
	}
	
	// get all categories
	@GetMapping("/")
	public Set<ProductCategory> getAllCategories(){
		Set<ProductCategory> categories = this.categoryService.getCategories();
		return categories;
	}
	
	// get category by id
	@GetMapping("/{categoryId}")
	public ProductCategory getCategory(@PathVariable("categoryId") Long categoryId) {
		return this.categoryService.getCategoryById(categoryId);
	}
	
	
	// delete category by id
	@DeleteMapping("/{categoryId}")
	public void deleteCategory(@PathVariable("categoryId") Long categoryId) {
		this.categoryService.deleteCategory(categoryId);
	}
	
	
	
	
	
	
	
	
	
	
	
}
