package com.fruitable.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Impression {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long impressionId;
	private String vote; // up/down
	private String sellerUserName;
	
	@OneToOne(fetch = FetchType.EAGER)
	private User user;

	public Impression() {
		super();
	}

	public Impression(Long impressionId, String vote, String sellerUserName, User user) {
		super();
		this.impressionId = impressionId;
		this.vote = vote;
		this.sellerUserName = sellerUserName;
		this.user = user;
	}

	public Long getImpressionId() {
		return impressionId;
	}

	public void setImpressionId(Long impressionId) {
		this.impressionId = impressionId;
	}

	public String getVote() {
		return vote;
	}

	public void setVote(String vote) {
		this.vote = vote;
	}

	public String getSellerUserName() {
		return sellerUserName;
	}

	public void setSellerUserName(String sellerUserName) {
		this.sellerUserName = sellerUserName;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
	
}
