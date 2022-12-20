package com.fruitable.Service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.UserRepository;
import com.fruitable.model.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user =  this.userRepository.findByUserName(username);
		if(user==null) {
			System.out.println("User not Found");
			throw new UsernameNotFoundException("No User Found !!");
		}
		return user;
	}
}
