package com.fruitable.fileResponse;

public class VerifyPasswordResponse {

	private Long userId;
	private String message;
	
	public VerifyPasswordResponse() {
		super();
	}

	public VerifyPasswordResponse(Long userId, String message) {
		super();
		this.userId = userId;
		this.message = message;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
	
	
}
