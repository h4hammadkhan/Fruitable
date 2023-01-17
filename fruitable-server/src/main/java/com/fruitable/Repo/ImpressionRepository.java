package com.fruitable.Repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.model.Impression;
import com.fruitable.model.User;

public interface ImpressionRepository extends JpaRepository<Impression, Long>{
	
	// get impression by user
	public Set<Impression> findByUser(User user);
	
	// get impression by sellerUserName and user
	public Impression findByUserAndSellerUserName(User user, String sellerUserName);
	
	// get impression by sellerUserName and vote and user
	public Impression findByUserAndSellerUserNameAndVote(User user, String sellerUserName,String vote);
}
