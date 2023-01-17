package com.fruitable.fileResponse;

import com.fruitable.model.User;

public class UserResponse {

	private User user;
	private String message;
	
	
	public UserResponse() {
		super();
		// TODO Auto-generated constructor stub
	}


	public UserResponse(User user, String message) {
		super();
		this.user = user;
		this.message = message;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}
	
	
	
	
}
