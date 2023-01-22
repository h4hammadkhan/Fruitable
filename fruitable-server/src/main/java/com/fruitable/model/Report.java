package com.fruitable.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Report {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long reportId;
	
	private Boolean spamOrMislead;
	private Boolean badQualityProducts;
	private Boolean others;
	private String description;
	private String buyerUserName;
	
	@Column(insertable = false, updatable = false,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date date;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;

	public Report() {
		super();
	}


	public Report(Long reportId, Boolean spamOrMislead, Boolean badQualityProducts, Boolean others, String description,
			String buyerUserName, Date date, User user) {
		super();
		this.reportId = reportId;
		this.spamOrMislead = spamOrMislead;
		this.badQualityProducts = badQualityProducts;
		this.others = others;
		this.description = description;
		this.buyerUserName = buyerUserName;
		this.date = date;
		this.user = user;
	}



	public Long getReportId() {
		return reportId;
	}

	public void setReportId(Long reportId) {
		this.reportId = reportId;
	}

	public Boolean getSpamOrMislead() {
		return spamOrMislead;
	}

	public void setSpamOrMislead(Boolean spamOrMislead) {
		this.spamOrMislead = spamOrMislead;
	}

	public Boolean getBadQualityProducts() {
		return badQualityProducts;
	}

	public void setBadQualityProducts(Boolean badQualityProducts) {
		this.badQualityProducts = badQualityProducts;
	}

	public Boolean getOthers() {
		return others;
	}

	public void setOthers(Boolean others) {
		this.others = others;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getBuyerUserName() {
		return buyerUserName;
	}

	public void setBuyerUserName(String buyerUserName) {
		this.buyerUserName = buyerUserName;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	
	
	
}
