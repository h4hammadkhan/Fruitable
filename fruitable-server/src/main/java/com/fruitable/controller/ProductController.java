package com.fruitable.controller;

import java.io.IOException;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fruitable.Service.FileService;
import com.fruitable.Service.ProductService;
import com.fruitable.fileResponse.FileResponse;
import com.fruitable.model.product.Product;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@Autowired
	private FileService fileService;
	
	@Value("${project.productImage}")
	private String path;
	
	// add new product
	@PostMapping("/")
	public Product addProduct(@RequestBody Product product) {
		return this.productService.addProduct(product);
	}
	
	// upload profile
	@PostMapping("/upload")
	public ResponseEntity<FileResponse> fileUpload(@RequestParam("image") MultipartFile image){
		String fileName =  null;
		try {
			fileName =  this.fileService.uploadImage(path, image);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<>(new FileResponse(
					null, "image is not uploaded due to some error"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(new FileResponse(
				fileName, "image is successfully uploaded"),HttpStatus.OK);
		
	}
	
	// update product
	@PostMapping("/update")
	public Product updateProduct(@RequestBody Product product) {
		return this.productService.updateProduct(product);
	}
	
	// get all product
	@GetMapping("/")
	public Set<Product> getAllProducts(){
		Set<Product> products = this.productService.getAllProducts();
		return products;
	}
		
	// get product by id
	@GetMapping("/{productId}")
	public Product getProduct(@PathVariable("productId") Long productId) {
		return this.productService.getProductById(productId);
	}
	
	// delete product by id
	@DeleteMapping("/{productId}")
	public void deleteProduct(@PathVariable("productId") Long productId) {
		this.productService.deleteProduct(productId);
	}
	
	
	
}