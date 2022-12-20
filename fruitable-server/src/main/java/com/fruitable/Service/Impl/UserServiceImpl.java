package com.fruitable.Service.Impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.RoleRepository;
import com.fruitable.Repo.UserRepository;
import com.fruitable.Service.UserService;
import com.fruitable.model.User;
import com.fruitable.model.UserRole;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	
	// creating user
	@Override 
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		
		// check if user exists
		User userExist = this.userRepository.findByUserName(user.getUserName());
		if(userExist!=null) {
			System.out.println("User already there!!!");
			throw new Exception("User already present");
		} else {
			// user create 
			
			// fetch roles form userRoles and save all roles in database
			for(UserRole ur:userRoles) {
				roleRepository.save(ur.getRole());
			}
			
			// set/assign userRoles to the user
			user.getUserRoles().addAll(userRoles);
			userExist = this.userRepository.save(user);
		}
		
		return userExist;
	}


	//getting user by user name
	@Override
	public User getUserByUserName(String username) {
		return this.userRepository.findByUserName(username);
	}


	//deleting the user
	@Override
	public void deleteById(Long userId) {
		this.userRepository.deleteById(userId);;
	}
	
	//getting all users
	@Override
	public Set<User> getAllUser() {
		return new HashSet<>(this.userRepository.findAll());
	}


	//updating the user
	@Override
	public User updateUser(User user) throws Exception {
		
		User local = this.userRepository.findByUserName(user.getUserName());
//		
		if(local!=null && local.getUserId()!=user.getUserId()) {
			System.out.println("User is already there !!");
			System.out.println(local.toString());
			throw new Exception("Use already there!!"); 
		}else {	
			return this.userRepository.save(user);
		}
	}

	
}
