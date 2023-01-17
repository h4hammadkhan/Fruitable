package com.fruitable.Service.Impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.RoleRepository;
import com.fruitable.Repo.UserRepository;
import com.fruitable.Service.UserService;
import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.fileResponse.OrderPagealeResponse;
import com.fruitable.fileResponse.UserPageableResponse;
import com.fruitable.helper.UserFoundException;
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
			throw new UserFoundException();
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
	public UserPageableResponse getAllUser(Integer pageNumber, Integer pageSize, String sortBy) {
		
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<User> pagePost = this.userRepository.findAll(p);
		
		List<User> allPost = pagePost.getContent();
		
		UserPageableResponse response = new UserPageableResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
	
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


	@Override
	public User getUserById(Long userId) {
		return this.userRepository.findById(userId).get();
	}


	@Override
	public void setImp(Long impression, Long userId) {
		this.userRepository.UpdateImpression(impression, userId);
	}
	

	@Override
	public UserPageableResponse getBuyers(Long roleId,Integer pageNumber, Integer pageSize, String sortBy) {

		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<User> pagePost = this.userRepository.getUsersByRole(roleId,p);
		
		List<User> allPost = pagePost.getContent();
		
		UserPageableResponse response = new UserPageableResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
			
		return response;
	
	}
	
	@Override
	public UserPageableResponse getSellers(Long roleId,Integer pageNumber, Integer pageSize, String sortBy) {

		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<User> pagePost = this.userRepository.getUsersByRole(roleId,p);
		
		List<User> allPost = pagePost.getContent();
		
		UserPageableResponse response = new UserPageableResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
			
		return response;
	
	}


	@Override
	public void setEnabled(Boolean enabled, Long userId) {
		this.userRepository.UpdateEnabled(enabled, userId);	
	}

	

	
}
