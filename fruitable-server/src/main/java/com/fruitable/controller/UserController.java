package com.fruitable.controller;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fruitable.Service.FileService;
import com.fruitable.Service.UserService;
import com.fruitable.fileResponse.FileResponse;
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
	private FileService fileService;
	
	@Value("${project.image}")
	private String path;
	
	
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
	public User createUserAsBuyer(@RequestBody User user) throws Exception {
		
		user.setProfile_image("default.png");
		Set<UserRole> roles = new HashSet<>();
		
		Role role = new Role();
		role.setRoleId(45L);
		role.setRoleName("BUYER");
		
		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		
		roles.add(userRole);

		return this.userService.createUser(user, roles);
	}
	
	
	
	// register user as a Seller
	@PostMapping("/seller")
	public User createUserAsSeller(@RequestBody User user) throws Exception {
		
		Set<UserRole> roles = new HashSet<>();
		
		Role role = new Role();
		role.setRoleId(46L);
		role.setRoleName("SELLER");
		
		UserRole userRole = new UserRole();
		userRole.setRole(role);
		userRole.setUser(user);
		
		roles.add(userRole);

		return this.userService.createUser(user, roles);
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
	public Set<User> getAllUser() {
		return this.userService.getAllUser();
	}
	
	//update user
	@PostMapping("/update")
	public User updateUser(@RequestBody User user) throws Exception {
		return this.userService.updateUser(user);
	}
	
}