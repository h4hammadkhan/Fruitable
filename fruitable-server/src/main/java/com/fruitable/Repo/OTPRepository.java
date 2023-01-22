package com.fruitable.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.model.OTP;
import com.fruitable.model.User;

public interface OTPRepository extends JpaRepository<OTP, Long>{

	// get OTP by userId
	public OTP findByUser(User user);
}
