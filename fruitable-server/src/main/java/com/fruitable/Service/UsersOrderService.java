package com.fruitable.Service;

import java.util.Set;

import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.model.User;

public interface UsersOrderService {

	// create order
	public UsersOrder addUserOrder(UsersOrder usersOrder);
	
	// update order
	public UsersOrder updateUserOrder(UsersOrder usersOrder);
	
	// get order by id
	public UsersOrder getOrderById(Long orderId);
	
	// get orders by user id
	public Set<UsersOrder> getOrderByUserId(User user);
	
	// get orders by active
	public Set<UsersOrder> getActiveOrder(Boolean active);
	
	// get orders by sellerUserName
	public Set<UsersOrder> getOrderBySellerUserName(String sellerUserName);
	
	// delete Order
	public void deleteOrder(Long usersOrderId);
	
	
	
}
