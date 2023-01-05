package com.fruitable.UserOrderModel;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fruitable.model.User;
import com.fruitable.model.product.Product;

@Entity
public class UsersOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long usersOrderId;
	private Long productQuantity;
	private Long subTotal;
	
	@Column(insertable = false, updatable = false,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date date;
	private String sellerUserName;
	private Boolean active = true;
	private String deliveryAddress;
	private String city;
	private String buyerFirstName;
	private String buyerLastName;
	private String buyerPhone;
	private String buyerEmail;
	private String buyerUserName;
	
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Product product;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;

	public UsersOrder() {
		super();
	}

	public UsersOrder(Long usersOrderId, Long productQuantity, Long subTotal, Date date, String sellerUserName,
			Boolean active, String deliveryAddress, String city, String buyerFirstName, String buyerLastName,
			String buyerPhone, String buyerEmail, String buyerUserName, Product product, User user) {
		super();
		this.usersOrderId = usersOrderId;
		this.productQuantity = productQuantity;
		this.subTotal = subTotal;
		this.date = date;
		this.sellerUserName = sellerUserName;
		this.active = active;
		this.deliveryAddress = deliveryAddress;
		this.city = city;
		this.buyerFirstName = buyerFirstName;
		this.buyerLastName = buyerLastName;
		this.buyerPhone = buyerPhone;
		this.buyerEmail = buyerEmail;
		this.buyerUserName = buyerUserName;
		this.product = product;
		this.user = user;
	}

	public Long getUsersOrderId() {
		return usersOrderId;
	}

	public void setUsersOrderId(Long usersOrderId) {
		this.usersOrderId = usersOrderId;
	}

	public Long getProductQuantity() {
		return productQuantity;
	}

	public void setProductQuantity(Long productQuantity) {
		this.productQuantity = productQuantity;
	}

	public Long getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(Long subTotal) {
		this.subTotal = subTotal;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
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

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getBuyerFirstName() {
		return buyerFirstName;
	}

	public void setBuyerFirstName(String buyerFirstName) {
		this.buyerFirstName = buyerFirstName;
	}

	public String getBuyerLastName() {
		return buyerLastName;
	}

	public void setBuyerLastName(String buyerLastName) {
		this.buyerLastName = buyerLastName;
	}

	public String getBuyerPhone() {
		return buyerPhone;
	}

	public void setBuyerPhone(String buyerPhone) {
		this.buyerPhone = buyerPhone;
	}

	public String getBuyerEmail() {
		return buyerEmail;
	}

	public void setBuyerEmail(String buyerEmail) {
		this.buyerEmail = buyerEmail;
	}

	public String getBuyerUserName() {
		return buyerUserName;
	}

	public void setBuyerUserName(String buyerUserName) {
		this.buyerUserName = buyerUserName;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	
	
	
	
	
}
