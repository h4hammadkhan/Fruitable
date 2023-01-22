package com.fruitable.model;

import java.util.Collection;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.model.product.Product;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class User implements UserDetails{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	private String first_name;
	private String last_name;
	private String userName;
	private String password;
	private String profile_image;
	private String email;
	private String phone;
	private String address;
	private boolean enabled = true;
	private Long impression = 1L;
	private String cnic;
	private String city;
	
	// user many roles
	@OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER,mappedBy = "user")
	@JsonIgnore
	private Set<UserRole> userRoles = new HashSet<>();
	
	
	@OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Product> products = new LinkedHashSet<>();
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<UsersOrder> usersOrder = new LinkedHashSet<>();

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Report> report;
	
	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private Impression vote;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<OTP> otp;
	
	
	


	public User() {
		super();
	}


	public User(Long userId, String first_name, String last_name, String userName, String password,
			String profile_image, String email, String phone, String address, boolean enabled, Long impression,
			String cnic, String city, Set<UserRole> userRoles, Set<Product> products, Set<UsersOrder> usersOrder,
			Set<Report> report, Impression vote, Set<OTP> otp) {
		super();
		this.userId = userId;
		this.first_name = first_name;
		this.last_name = last_name;
		this.userName = userName;
		this.password = password;
		this.profile_image = profile_image;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.enabled = enabled;
		this.impression = impression;
		this.cnic = cnic;
		this.city = city;
		this.userRoles = userRoles;
		this.products = products;
		this.usersOrder = usersOrder;
		this.report = report;
		this.vote = vote;
		this.otp = otp;
	}





	public String getCnic() {
		return cnic;
	}
	
	public void setCnic(String cnic) {
		this.cnic = cnic;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public Set<UsersOrder> getUsersOrder() {
		return usersOrder;
	}

	public void setUsersOrder(Set<UsersOrder> usersOrder) {
		this.usersOrder = usersOrder;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}	
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getProfile_image() {
		return profile_image;
	}

	public void setProfile_image(String profile_image) {
		this.profile_image = profile_image;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Long getImpression() {
		return impression;
	}

	public void setImpression(Long impression) {
		this.impression = impression;
	}

	public Set<UserRole> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
	}
	
	public Set<Product> getProducts() {
		return products;
	}
	
	public void setProducts(Set<Product> products) {
		this.products = products;
	}

	public Set<Report> getReport() {
		return report;
	}
		
	public void setReport(Set<Report> report) {
		this.report = report;
	}
	
	public Impression getVote() {
		return vote;
	}
	
	public void setVote(Impression vote) {
		this.vote = vote;
	}
		
	
	public Set<OTP> getOtp() {
		return otp;
	}
	
	
	public void setOtp(Set<OTP> otp) {
		this.otp = otp;
	}
	
	

	
	
	
	
	
	
	// UserDetails method implementation 


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		Set<Authority> set = new HashSet<>();
		this.userRoles.forEach(userRole -> {
			set.add(new Authority(userRole.getRole().getRoleName()));
		});
		 		
		return set;
	}
	
	
	@Override
	public String getUsername() {
		return getUserName();
	}


	@Override
	public boolean isAccountNonExpired() {
		return true;
	}


	@Override
	public boolean isAccountNonLocked() {
		return isEnabled();
	}


	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
		
}
