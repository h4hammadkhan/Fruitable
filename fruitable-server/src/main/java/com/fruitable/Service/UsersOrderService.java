package com.fruitable.Service;

import java.util.Set;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Page;

import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.fileResponse.OrderPagealeResponse;
import com.fruitable.model.User;

public interface UsersOrderService {

	// create order
	public Set<UsersOrder> addUserOrder(UsersOrder[] usersOrder);
	
	// update order
	public UsersOrder updateUserOrder(UsersOrder usersOrder);
	
	// get order by id
	public UsersOrder getOrderById(Long orderId);
	
	// get orders by user id
	public OrderPagealeResponse getOrderByUserId(User user,Integer pageNumber, Integer pageSize,String sortBy);
	
	// get orders by active
	public Set<UsersOrder> getActiveOrder(Boolean active);
	
	// get orders by sellerUserName
	public OrderPagealeResponse getOrderBySellerUserName(
			String sellerUserName,Integer pageNumber, Integer pageSize,String sortBy);
	
	// delete Order
	public void deleteOrder(Long usersOrderId);
	
	// get order by seller userNAme and active
	public OrderPagealeResponse getOrderBySellerusernameAndActive(
			String username, Boolean active,Integer pageNumber, Integer pageSize,String sortBy);
	
	// get order by order code and active
	public OrderPagealeResponse getOrderByOrderCodeAndActive(
			String orderCode, Boolean active,Integer pageNumber, Integer pageSize,String sortBy);
	
	// get order by orderCode and userId
	public OrderPagealeResponse getOrderByOrderCodeAndUser(
			String orderCode, User user, Integer pageNumber, Integer pageSize,String sortBy);
	
	
}
