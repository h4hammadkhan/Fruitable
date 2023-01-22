package com.fruitable.Service;

import com.fruitable.model.OTP;

public interface OTPService {

	// save opt
	public OTP addOtp(OTP otp);
	
	// update opt
	public OTP update(OTP otp);
	
	// get OTP by id
	public OTP getOtpById(Long otpId);
	
	// get OTP by UserId
	public OTP getOtpByUserId(Long userId);
	
	// delete OTP
	public void deleteOtp(Long optId);
	
}
