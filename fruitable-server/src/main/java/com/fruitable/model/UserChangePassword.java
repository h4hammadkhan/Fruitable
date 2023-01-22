package com.fruitable.model;

public class UserChangePassword {
	
	private Long userId;
	private String oldPassword;
	private String newPassword;
	
	
	public UserChangePassword() {
		super();
		// TODO Auto-generated constructor stub
	}


	public UserChangePassword(Long userId, String oldPassword, String newPassword) {
		super();
		this.userId = userId;
		this.oldPassword = oldPassword;
		this.newPassword = newPassword;
	}


	public Long getUserId() {
		return userId;
	}


	public void setUserId(Long userId) {
		this.userId = userId;
	}


	public String getOldPassword() {
		return oldPassword;
	}


	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}


	public String getNewPassword() {
		return newPassword;
	}


	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
	
	
	
	
}
