package com.fruitable.controller;

import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fruitable.Service.UsersOrderService;
import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.model.User;

@RestController
@RequestMapping("/order")
@CrossOrigin("*")
public class UsersOrderController {
	
	@Autowired
	private UsersOrderService usersOrderService;
	
	private Logger logger = LoggerFactory.getLogger(UsersOrderController.class);
	
	
	// add no of order
	@PostMapping("/new")
	public ResponseEntity<?> addNewOrder(@RequestBody UsersOrder[] usersOrder){
		
		this.logger.info("{} number of data ",usersOrder.length);
		return ResponseEntity.ok("uploaded");
	}
	
	// add order
	@PostMapping("/")
	public UsersOrder addOrder(@RequestBody UsersOrder usersOrder) {
		return this.usersOrderService.addUserOrder(usersOrder);
	}
	
	// add order
	@PostMapping("/update")
	public UsersOrder updateOrder(@RequestBody UsersOrder userOrder) {
		return this.usersOrderService.updateUserOrder(userOrder);
	}
	
	// get Order by orderId
	@GetMapping("/{usersOrderId}")
	public UsersOrder getOrderById(@PathVariable("usersOrderId") Long usersOrderId) {
		return this.usersOrderService.getOrderById(usersOrderId);
	}
	
	// get order by userId
	@GetMapping("/buyer/{userId}")
	public Set<UsersOrder> getOrderByUserId(@PathVariable("userId") Long userId){
		User user = new User();
		user.setUserId(userId);
		return this.usersOrderService.getOrderByUserId(user);
	}
	
	// get active orders
	@GetMapping("/active")
	public Set<UsersOrder> getActiveOrders(){
		Boolean active = true;
		return this.usersOrderService.getActiveOrder(active);
	}
	
	// get order by seller userName
	@GetMapping("/seller/{sellerUserName}")
	public Set<UsersOrder> getSellersOrder(@PathVariable("sellerUserName") String sellerUserName){
		return this.usersOrderService.getOrderBySellerUserName(sellerUserName);
	}
	
	// delete order 
	@DeleteMapping("/{usersOrderId}")
	public void deleteUsersOrder(@PathVariable("usersOrderId") Long usersOrderId) {
		this.usersOrderService.deleteOrder(usersOrderId);
	}
	
	
}
