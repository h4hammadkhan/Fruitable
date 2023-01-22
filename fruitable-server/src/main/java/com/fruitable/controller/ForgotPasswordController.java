package com.fruitable.controller;

import java.util.Random;

import javax.mail.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fruitable.Repo.UserRepository;
import com.fruitable.Service.MailService;
import com.fruitable.Service.OTPService;
import com.fruitable.fileResponse.ForgotPasswordResponse;
import com.fruitable.fileResponse.VerifyPasswordResponse;
import com.fruitable.model.OTP;
import com.fruitable.model.User;

@RestController
@CrossOrigin("*")
@RequestMapping("/forgot")
public class ForgotPasswordController {

	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private OTPService otpService;
	
	@Autowired
	private MailService mailService;

	Random random =  new Random(100000);
	
	@PostMapping("/send-otp/{userName}")
	public ResponseEntity<ForgotPasswordResponse> forgotPassword(@PathVariable("userName") String userName){
		
		User user = this.userRepository.findByUserName(userName);
		if(user != null) {
			
			// generate OTP of 6 digits
			int otp = random.nextInt(999999);
			
			String subject = "Fruitable: Forgot Password OTP";
			String message = ""
						+ "<div style='border:1px solid #e2e2e2; padding: 20px'>"
						+ "<h3>"
						+ "Your OTP is "
						+ "<b>"
						+ otp
						+ "</b>"
						+ "</h3>"
						+ "</div>";
			String to = user.getEmail();
		
			boolean flag = this.mailService.SendEmail(subject,message,to);
			
			if(flag) {
				
				// save opt 
				OTP addOTP = null;			
				
				// get OPT Info by User Id
				OTP otpByUserId = this.otpService.getOtpByUserId(user.getUserId());
				
				// check if specific user'OTP already present in DB
				// yes then update old OPT into new
				OTP otpDetail = new OTP();
				if(otpByUserId != null) {
					otpDetail.setOtpId(otpByUserId.getOtpId());
					otpDetail.setOneTimePassword(otp);
					otpDetail.setUser(user);
					addOTP = this.otpService.update(otpDetail);
				}else {
					// if NO
					// add new OTP in DB
					otpDetail.setOneTimePassword(otp);
					otpDetail.setUser(user);
					addOTP = this.otpService.addOtp(otpDetail);
				}
				
				return new ResponseEntity<ForgotPasswordResponse>(new 
						ForgotPasswordResponse(addOTP,"We have send OTP, Check your Email: "+user.getEmail()),HttpStatus.OK);
			}
			
			return new ResponseEntity<ForgotPasswordResponse>(new 
					ForgotPasswordResponse(null,"Something Went Wrong"),HttpStatus.INTERNAL_SERVER_ERROR);
		}else {
			return new ResponseEntity<ForgotPasswordResponse>(new 
	    			ForgotPasswordResponse(null,"User not Found, Check Your Username"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	    
	}
	
	@PostMapping("/verify/{userOtp}")
	public ResponseEntity<VerifyPasswordResponse> verifyOtp(
			@RequestBody OTP otp,
			@PathVariable("userOtp") int userOtp
	){
		Long userId = otp.getUser().getUserId();
		if(otp.getOneTimePassword() == userOtp) {
			
			this.otpService.deleteOtp(otp.getOtpId());
			return new ResponseEntity<VerifyPasswordResponse>(new 
					VerifyPasswordResponse(userId, "Successfully Matched!!"),HttpStatus.OK);
			
		}
		return new ResponseEntity<VerifyPasswordResponse>(new 
				VerifyPasswordResponse(null, "OPT did not match, Enter valid OPT"),HttpStatus.INTERNAL_SERVER_ERROR);
	}
	

	
	
	
	
}
