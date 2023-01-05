package com.fruitable.Service.Impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.UsersOrderRepository;
import com.fruitable.Service.UsersOrderService;
import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.model.User;

@Service
public class UsersOrderServiceImpl implements UsersOrderService{

	@Autowired
	private UsersOrderRepository usersOrderRepository;

	// add order
	@Override
	public UsersOrder addUserOrder(UsersOrder usersOrder) {
		return this.usersOrderRepository.save(usersOrder);
	}

	// update order
	@Override
	public UsersOrder updateUserOrder(UsersOrder usersOrder) {
		return this.usersOrderRepository.save(usersOrder);
	}

	// get order by orderId
	@Override
	public UsersOrder getOrderById(Long orderId) {
		return this.usersOrderRepository.findById(orderId).get();
	}
	
	// get order by userId
	@Override
	public Set<UsersOrder> getOrderByUserId(User user) {
		return new HashSet<>(this.usersOrderRepository.findByuser(user));
	}

	// get active order
	@Override
	public Set<UsersOrder> getActiveOrder(Boolean active) {
		return new HashSet<>(this.usersOrderRepository.findByactive(active));
	}

	// get order by seller userName
	@Override
	public Set<UsersOrder> getOrderBySellerUserName(String sellerUserName) {
		return new HashSet<>(usersOrderRepository.findBysellerUserName(sellerUserName));
	}

	// delete Order
	@Override
	public void deleteOrder(Long usersOrderId) {
		UsersOrder usersOrder = new UsersOrder();
		usersOrder.setUsersOrderId(usersOrderId);
		this.usersOrderRepository.delete(usersOrder);		
	}

}