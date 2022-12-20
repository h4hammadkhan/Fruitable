package com.fruitable.Service;

import java.util.List;
import java.util.Set;

import com.fruitable.model.User;
import com.fruitable.model.UserRole;

public interface UserService {

	// creating user
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;
	
	//get user by user name
	public User getUserByUserName(String username);
	
	//delete user by user id
	public void deleteById(Long userId);
	
	//Get all user
	public Set<User> getAllUser();
	
	//update user
	public User updateUser(User user) throws Exception;
	
}
