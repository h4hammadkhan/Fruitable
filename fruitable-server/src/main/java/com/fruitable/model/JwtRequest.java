package com.fruitable.model;

public class JwtRequest {
	
	String username;
	String password;
	
	
	public JwtRequest() {
		super();
	}


	public JwtRequest(String username, String password) {
		super();
		this.username = username;
		this.password = password;
	}


	public String getUserName() {
		return username;
	}


	public void setUserName(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}

}
