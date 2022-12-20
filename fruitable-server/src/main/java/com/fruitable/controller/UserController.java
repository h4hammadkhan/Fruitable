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

import com.fruitable.Service.UserService;
import com.fruitable.model.Role;
import com.fruitable.model.User;
import com.fruitable.model.UserRole;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
 
	@Autowired
	private UserService userService;
	
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {
		
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
