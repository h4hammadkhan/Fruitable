package com.fruitable.Service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.OTPRepository;
import com.fruitable.Service.OTPService;
import com.fruitable.model.OTP;
import com.fruitable.model.User;

@Service
public class OTPServiceImpl implements OTPService{

	@Autowired
	private OTPRepository otpRepository;
	
	@Override
	public OTP addOtp(OTP otp) {
		return this.otpRepository.save(otp);
	}

	@Override
	public OTP update(OTP otp) {
		return this.otpRepository.save(otp);
	}

	@Override
	public OTP getOtpById(Long otpId) {
		return this.otpRepository.findById(otpId).get();
	}

	@Override
	public OTP getOtpByUserId(Long userId) {
		User user = new User();
		user.setUserId(userId);
		return this.otpRepository.findByUser(user);
	}

	@Override
	public void deleteOtp(Long optId) {
		OTP otp = new OTP();
		otp.setOtpId(optId);
		this.otpRepository.delete(otp);		
	}

	
	
}
