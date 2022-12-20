package com.fruitable.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

	//get user by UserName
	public User findByUserName(String username);
	
	
}
