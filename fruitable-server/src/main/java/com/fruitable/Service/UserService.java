package com.fruitable.Service;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.fruitable.fileResponse.UserPageableResponse;
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
	public UserPageableResponse getAllUser(Integer pageNumber, Integer pageSize, String sortBy);
	
	//update user
	public User updateUser(User user) throws Exception;
	
	// get user by userId
	public User getUserById(Long userId);
	
	// update impression
	public void setImp(Long impression, Long userId);
	
	// update Enabled/ lock user account
	public void setEnabled(Boolean enabled, Long userId);
		
	// get user as buyers
	public UserPageableResponse getBuyers(Long roleId,Integer pageNumber, Integer pageSize, String sortBy);
	
	// get user as SELLER
	public UserPageableResponse getSellers(Long roleId,Integer pageNumber, Integer pageSize, String sortBy);

}
