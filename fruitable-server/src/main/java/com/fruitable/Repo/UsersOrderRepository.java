package com.fruitable.Repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.model.User;

public interface UsersOrderRepository extends JpaRepository<UsersOrder, Long>{
	
	// get orders by active
	public Set<UsersOrder> findByactive(Boolean active);
	
	// get orders by sellerUserName
	public Set<UsersOrder> findBysellerUserName(String sellerUserName);
	
	// get order by userId
	public Set<UsersOrder> findByuser(User user);
}
