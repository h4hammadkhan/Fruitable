package com.fruitable.model.product;

import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.model.User;

@Entity
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long productId;
	private String productName;
	private Long quantity;
	private Long price;
	private String product_image;
	private String measure; // KGs or Dozens
	
	@Column(insertable = false, updatable = false,columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	private Date date;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private ProductCategory productCategory;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;
	
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<UsersOrder> usersOrder = new LinkedHashSet<>();

	public Product() {
		super();
	}


	public Product(Long productId, String productName, Long quantity, Long price, String product_image, String measure,
			Date date, ProductCategory productCategory, User user) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.quantity = quantity;
		this.price = price;
		this.product_image = product_image;
		this.measure = measure;
		this.date = date;
		this.productCategory = productCategory;
		this.user = user;
//		this.order = order;
	}




	public Long getProductId() {
		return productId;
	}

	public void setProductId(Long productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}

	public Long getPrice() {
		return price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public String getProduct_image() {
		return product_image;
	}

	public void setProduct_image(String product_image) {
		this.product_image = product_image;
	}

	public String getMeasure() {
		return measure;
	}

	public void setMeasure(String measure) {
		this.measure = measure;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public ProductCategory getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(ProductCategory productCategory) {
		this.productCategory = productCategory;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	public Set<UsersOrder> getUsersOrder() {
		return usersOrder;
	}


	public void setUsersOrder(Set<UsersOrder> usersOrder) {
		this.usersOrder = usersOrder;
	}


	@Override
	public String toString() {
		return "Product [productId=" + productId + ", productName=" + productName + ", quantity=" + quantity
				+ ", price=" + price + ", product_image=" + product_image + ", measure=" + measure + ", date=" + date
				+ ", productCategory=" + productCategory + ", user=" + user + ", usersOrder=" + usersOrder + "]";
	}


	
	
	
	

	
	
}
