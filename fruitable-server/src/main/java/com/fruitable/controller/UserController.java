package com.fruitable.controller;


import java.io.IOException;
import java.io.InputStream;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
import com.fruitable.Repo.UserRepository;
import com.fruitable.Service.FileService;
import com.fruitable.Service.UserService;
import com.fruitable.fileResponse.FileResponse;
import com.fruitable.fileResponse.UserPageableResponse;
import com.fruitable.fileResponse.UserResponse;
import com.fruitable.helper.UserFoundException;
import com.fruitable.model.Role;
import com.fruitable.model.User;
import com.fruitable.model.UserRole;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
 
	@Autowired
	private UserService userService;
	
	@Autowired 
	private UserRepository userRepository;
	
	@Autowired
	private FileService fileService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	
	@Value("${project.image}")
	private String path;
	
	@Autowired
	private ObjectMapper mapper;
	
	
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
	
	// upload profile
	@PostMapping("/upload/{userId}")
	public ResponseEntity<FileResponse> uploadFileByUserId(
			@PathVariable("userId") Long userId,
			@RequestParam("image") MultipartFile image
	){
		String fileName =  null;
		try {
			fileName =  this.fileService.uploadImage(path, image);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity<>(new FileResponse(
					null, "image is not uploaded due to some error"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		User userDetail  = this.userRepository.findById(userId).get();
		userDetail.setProfile_image(fileName);
		
		try {
			this.updateUser(userDetail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<>(new FileResponse(
				fileName, "image is successfully uploaded"),HttpStatus.OK);
		
	}
	
	// get profile
	@GetMapping(value = "/profile/{imageName}",produces = MediaType.IMAGE_JPEG_VALUE)
	public void serveImage(@PathVariable("imageName") String imageName,
			HttpServletResponse response) throws IOException {
		
		//getting file inputStream
		InputStream resource = this.fileService.getImage(path, imageName);
		
		// set response contentType 
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		// Deliver content form path/resource
		StreamUtils.copy(resource, response.getOutputStream());
	}
	
	
	
	 // register user as a buyer
	@PostMapping("/")
	public ResponseEntity<UserResponse> createUserAsBuyer(@RequestBody User user){
	
		User registerdUser = null;
		
		user.setProfile_image("default.png");
		
		// encoding password with bCryptpasswordencoder
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		Set<UserRole> roles = new HashSet<>();
		
		Role role = new Role();
		role.setRoleId(45L);
		role.setRoleName("BUYER");
		
		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		
		roles.add(userRole);

		try {
			registerdUser = this.userService.createUser(user, roles); 
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new UserResponse(
					null, "User with this username is already there in DB !! try with another one"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<UserResponse>(new UserResponse(registerdUser,"Successfully Registered!!"),HttpStatus.OK);
	}
	
	
	
	// register user as a Seller
	@PostMapping("/seller")
	public ResponseEntity<UserResponse> createUserAsSeller(
			@RequestParam("user") String user,
			@RequestParam("image") MultipartFile image
	) {
		
		User registerdUser = null;
		
		// converting string into JSON
		User userDetail = null;
		try {
			userDetail = mapper.readValue(user,User.class); 
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return new ResponseEntity<>(new UserResponse(
					null, "Invalid Bad Request!!"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		// save file 
		ResponseEntity<FileResponse> fileResponse =  this.fileUpload(image);
		// getting image name
		String imageName = fileResponse.getBody().getFileName();
		
		userDetail.setProfile_image(imageName);
		
		// encoding password with bCryptpasswordencoder
		userDetail.setPassword(this.bCryptPasswordEncoder.encode(userDetail.getPassword()));
		
		Set<UserRole> roles = new HashSet<>();
		
		Role role = new Role();
		role.setRoleId(46L);
		role.setRoleName("SELLER");
		
		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(userDetail);
		
		roles.add(userRole);

		try {
			registerdUser = this.userService.createUser(userDetail, roles);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(new UserResponse(
					null, "User with this username is already there in DB !! try with another one"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return  new ResponseEntity<UserResponse>(new UserResponse(registerdUser,"Successfully Registered!!"),HttpStatus.OK);
	}
	
	
	//get user by user name
	@GetMapping("/{username}")
	public User getUserByUserName(@PathVariable("username") String username) {		
		return this.userService.getUserByUserName(username);
	}
	
	
	//delete user by userId
	@DeleteMapping("/{userId}")
	public void deleteById(@PathVariable("userId") Long userId) {
		this.userService.deleteById(userId);
	}
	
	//get All user
	@GetMapping("/")
	public ResponseEntity<UserPageableResponse> getAllUser(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "userId", required = false) String sortBy
	) {

	
		UserPageableResponse allUser = this.userService.getAllUser(pageNumber, pageSize, sortBy);
		
		return new ResponseEntity<UserPageableResponse>(allUser,HttpStatus.OK);

	}
	
	//update user
	@PostMapping("/update")
	public User updateUser(@RequestBody User user) throws Exception {
		return this.userService.updateUser(user);
	}
	
	// get user by userId
	@GetMapping("/get/{userId}")
	public User getUserById(@PathVariable("userId") Long userId) {
		return this.userService.getUserById(userId);
	}
	
	// set impression
	@PostMapping("imp/{userId}")
	public void setImpression(@PathVariable("userId") Long userId) {
		User user = this.userRepository.findById(userId).get();
		Long impression = user.getImpression();
		impression++;
		this.userService.setImp(impression, userId);
	}
	
	// lock user account
	@PostMapping("lock/{userId}")
	public void lockUserAccount(@PathVariable("userId") Long userId) {
		User user = this.userRepository.findById(userId).get();
		Boolean enabled = false;
		this.userService.setEnabled(enabled, userId);
	}
	
	// unlock user account
	@PostMapping("unlock/{userId}")
	public void unLockUserAccount(@PathVariable("userId") Long userId) {
		User user = this.userRepository.findById(userId).get();
		Boolean enabled = true;
		this.userService.setEnabled(enabled, userId);
	}
	
	@GetMapping("/user-role/buyer")
	public ResponseEntity<UserPageableResponse> getBuyers(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "userId", required = false) String sortBy
	){
		UserPageableResponse buyers = this.userService.getBuyers(45L,pageNumber,pageSize,sortBy);
		return ResponseEntity.ok(buyers);
	}
	
	@GetMapping("/user-role/seller")
	public ResponseEntity<UserPageableResponse> getSellers(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "userId", required = false) String sortBy
	){
		UserPageableResponse sellers = this.userService.getSellers(46L,pageNumber,pageSize,sortBy);
		return ResponseEntity.ok(sellers);
	}
	

	
	
	
}