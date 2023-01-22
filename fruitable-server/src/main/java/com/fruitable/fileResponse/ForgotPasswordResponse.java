package com.fruitable.fileResponse;

import com.fruitable.model.OTP;

public class ForgotPasswordResponse {

	private OTP otp;
	private String message;


	public ForgotPasswordResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	

	public ForgotPasswordResponse(OTP otp, String message) {
		super();
		this.otp = otp;
		this.message = message;
	}



	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}



	public OTP getOtp() {
		return otp;
	}



	public void setOtp(OTP otp) {
		this.otp = otp;
	}
	
	
	
}
