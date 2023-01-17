package com.fruitable.UserOrderModel;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;



@Entity
public class Ship {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long shipId;
	
	@Column(insertable = false, updatable = false,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date shipDate;
	
	private String code;
	private String sellerUserName;
	private Boolean active = true;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private UsersOrder usersOrder;

	public Ship() {
		super();
		// TODO Auto-generated constructor stub
	}

	

	public Ship(Long shipId, Date shipDate, String code, String sellerUserName, Boolean active, UsersOrder usersOrder) {
		super();
		this.shipId = shipId;
		this.shipDate = shipDate;
		this.code = code;
		this.sellerUserName = sellerUserName;
		this.active = active;
		this.usersOrder = usersOrder;
	}



	public Long getShipId() {
		return shipId;
	}

	public void setShipId(Long shipId) {
		this.shipId = shipId;
	}

	public Date getShipDate() {
		return shipDate;
	}

	public void setShipDate(Date shipDate) {
		this.shipDate = shipDate;
	}

	public UsersOrder getUsersOrder() {
		return usersOrder;
	}

	public void setUsersOrder(UsersOrder usersOrder) {
		this.usersOrder = usersOrder;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}



	public String getSellerUserName() {
		return sellerUserName;
	}



	public void setSellerUserName(String sellerUserName) {
		this.sellerUserName = sellerUserName;
	}



	public Boolean getActive() {
		return active;
	}



	public void setActive(Boolean active) {
		this.active = active;
	}	

	
	
	
}
