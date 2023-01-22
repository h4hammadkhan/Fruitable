package com.fruitable.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fruitable.Service.OTPService;
import com.fruitable.model.OTP;


@RestController
@CrossOrigin("*")
@RequestMapping("/otp")
public class OtpController {

	@Autowired
	private OTPService otpService;
	
	// add 
	@PostMapping("/")
	public OTP addOTP(@RequestBody OTP otp) {
		return this.otpService.addOtp(otp);
	}
	
	// update
	@PostMapping("/update")
	public OTP updateOTP(@RequestBody OTP otp) {
		return this.otpService.addOtp(otp);
	}
	
	
	// get by otpId
	@GetMapping("/{otpId}")
	public OTP getById(@PathVariable("otpId") Long otpId) {
		return this.otpService.getOtpById(otpId);
	}
	
	// get by UserId
	@GetMapping("/user/{userId}")
	public OTP getByUserId(@PathVariable("userId") Long userId) {
		return this.otpService.getOtpByUserId(userId);
	}
	
	
	// delete otp
	@DeleteMapping("/delete/{otpId}")
	public void deleteOtp(@PathVariable("otpId") Long otpId) {
		 this.otpService.deleteOtp(otpId);
	}
	
	
	
	
	
}
