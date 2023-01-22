package com.fruitable.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class OTP {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long otpId;
	private int oneTimePassword;
	@Column(insertable = false, updatable = false,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date date;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;
	
	public OTP() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	public OTP(Long otpId, int oneTimePassword, Date date, User user) {
		super();
		this.otpId = otpId;
		this.oneTimePassword = oneTimePassword;
		this.date = date;
		this.user = user;
	}


	public Long getOtpId() {
		return otpId;
	}

	public void setOtpId(Long otpId) {
		this.otpId = otpId;
	}

	public int getOneTimePassword() {
		return oneTimePassword;
	}

	public void setOneTimePassword(int oneTimePassword) {
		this.oneTimePassword = oneTimePassword;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}
