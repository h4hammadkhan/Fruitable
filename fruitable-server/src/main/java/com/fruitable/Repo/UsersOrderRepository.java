package com.fruitable.Repo;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.model.User;

public interface UsersOrderRepository extends JpaRepository<UsersOrder, Long>{
	
	// get orders by active
	public Set<UsersOrder> findByactive(Boolean active);
	
	// get orders by sellerUserName
	public Page<UsersOrder> findBysellerUserName(String sellerUserName,Pageable p);
	
	// get order by userId
	public Page<UsersOrder> findByuser(User user,Pageable p);
	
	// get orders by active And sellerUsername
	public Page<UsersOrder> findBySellerUserNameAndActive(String sellerUserName, Boolean active,Pageable p);
	
	// get orders by active And OrdreCode
	public Page<UsersOrder> findByOrderCodeAndActive(String orderCode, Boolean active,Pageable p);
	
	// get orders by userId and OrderCode
	public Page<UsersOrder> findByOrderCodeAndUser(String orderCode,User user,Pageable p);
}
