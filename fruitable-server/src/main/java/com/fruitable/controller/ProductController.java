package com.fruitable.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fruitable.Repo.ProductRepository;
import com.fruitable.Service.FileService;
import com.fruitable.Service.ProductService;
import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.fileResponse.FileResponse;
import com.fruitable.fileResponse.ProductPagealeResponse;
import com.fruitable.model.User;
import com.fruitable.model.product.Product;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private FileService fileService;
	
	@Value("${project.productImage}")
	private String path;
	
	private Logger logger = LoggerFactory.getLogger(UsersOrderController.class);

	
	@Autowired
	private ObjectMapper mapper;
	
	// add new product
	@PostMapping("/")
	public Product addProduct(@RequestBody Product product) {
		return this.productService.addProduct(product);
	}
	
	// add new Product With Product Image
	@PostMapping("/add")
	public ResponseEntity<?> addNewProduct(
			@RequestParam("product") String product,
			@RequestParam("image") MultipartFile image
	) {
		// converting string into JSON
		Product pro = null;
		try {
			pro = mapper.readValue(product, Product.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Request");
		}
		
		// save file 
		ResponseEntity<FileResponse> fileResponse =  this.fileUpload(image);
		// getting image name
		String imageName = fileResponse.getBody().getFileName();
		
		// save product
		pro.setProduct_image(imageName);
		
		return ResponseEntity.ok(this.productService.addProduct(pro));
	}
	
	// upload product Image
	@PostMapping("/upload")
	public ResponseEntity<FileResponse> fileUpload(@RequestParam("image") MultipartFile image){
		String fileName =  null;
		try {
			fileName =  this.fileService.uploadImage(path, image);
		} catch (IOException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new FileResponse(
					null, "image is not uploaded due to some error"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<>(new FileResponse(
				fileName, "image is successfully uploaded"),HttpStatus.OK);
		
	}
	
	// get product image
	@GetMapping(value = "/productImage/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
	public void serveImage(@PathVariable("imageName") String imageName,
			HttpServletResponse response) throws IOException {
		
		//getting file inputStream
		InputStream resource = this.fileService.getImage(path, imageName);
		
		// set response contentType 
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		// Deliver content form path/resource
		StreamUtils.copy(resource, response.getOutputStream());
		
	}
	
	
	// update product
	@PostMapping("/update")
	public ResponseEntity<?> updateProduct(
			@RequestParam("product") String product,
			@RequestParam(name="image", required=false)  MultipartFile image
	) {
		// converting string into JSON
		Product pro = null;
		try {
			pro = mapper.readValue(product, Product.class);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Request");
		}
		
		if(image != null) {
			
			// save file 
			ResponseEntity<FileResponse> fileResponse =  this.fileUpload(image);
			// getting image name
			String imageName = fileResponse.getBody().getFileName();
			
			// save product
			pro.setProduct_image(imageName);
		}else {

			Optional<Product> pro2 = this.productRepository.findById(pro.getProductId());
			pro.setProduct_image(pro2.get().getProduct_image());
			
		}

		return ResponseEntity.ok(this.productService.updateProduct(pro));
	}
	
	
	// update product quantity
	@PostMapping("/update/productQty")
	public Set<Product> updateProductQtantity(@RequestBody UsersOrder[] product){
		
		Set<Product> pro = new HashSet<>();
		
		Arrays.stream(product).forEach(list ->{
			 Product updatedProduct = this.productRepository.findById(list.getProduct().getProductId()).get();
			 //	logger.info("data {}",updatedProduct);
			 updatedProduct.setQuantity(updatedProduct.getQuantity()-list.getProductQuantity());
			 pro.add(updatedProduct);
			 System.out.println(list.getProduct().getProductId());
		});
		
		return this.productService.updateProductQty(pro);
		//	return null;
	}
		
	
	// get all product
	@GetMapping("/")
	public ResponseEntity<ProductPagealeResponse> getAllProducts(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "productId", required = false) String sortBy
	){
		
		ProductPagealeResponse products = this.productService.getAllProducts(pageNumber,pageSize,sortBy);
		
		return new ResponseEntity<ProductPagealeResponse>(products, HttpStatus.OK);  
	}
	
		
	// get all by userId
	@GetMapping("/user/all/{userId}") 
	public ResponseEntity<ProductPagealeResponse> getProductsByUser(
			@PathVariable("userId") Long userId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "3", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "productId", required = false) String sortBy
	){
		
		User user = new User();
		user.setUserId(userId);
		ProductPagealeResponse productsByUser = this.productService.getProductsByUser(user,pageNumber,pageSize,sortBy);
		
		return new ResponseEntity<ProductPagealeResponse>(productsByUser,HttpStatus.OK);
	}
		
	// get product by id
	@GetMapping("/{productId}")
	public Product getProduct(@PathVariable("productId") Long productId) {
		return this.productService.getProductById(productId);
	}
	
	// delete product by id
	@DeleteMapping("/{productId}")
	public void deleteProduct(@PathVariable("productId") Long productId) throws IOException {
		this.productService.deleteProduct(productId);
	}
	
	// delete pofile
	@DeleteMapping("/delete/{name}")
	public void deleteProdutImage(@PathVariable("name") String name) throws IOException {
		
		String imgName = name;
		Path root = Paths.get(path);
		Path file = root.resolve(imgName);
		System.out.println("image name: "+imgName);
		
		Files.delete(file);
	}
	
	
	// search by product name
	@GetMapping("/search/{productName}")
	public ResponseEntity<ProductPagealeResponse> searchProducts(
			@PathVariable("productName") String productName,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "productId", required = false) String sortBy
	){
		
		ProductPagealeResponse products = this.productService.searchProduct(productName, pageNumber, pageSize, sortBy);
		
		return new ResponseEntity<ProductPagealeResponse>(products, HttpStatus.OK);  
	}
	
	// search by product name
	@GetMapping("/category/{categoryId}")
	public ResponseEntity<ProductPagealeResponse> getProductsByCategoryId(
			@PathVariable("categoryId") Long categoryId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "productId", required = false) String sortBy
	){
		
		ProductPagealeResponse products = this.productService.getProductByProductCategory(categoryId, pageNumber, pageSize, sortBy);
		
		return new ResponseEntity<ProductPagealeResponse>(products, HttpStatus.OK);  
	}
	
}