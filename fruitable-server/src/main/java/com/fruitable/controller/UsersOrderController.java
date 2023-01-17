package com.fruitable.controller;

import java.util.Arrays;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fruitable.Service.UsersOrderService;
import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.fileResponse.OrderPagealeResponse;
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

		return ResponseEntity.ok(this.usersOrderService.addUserOrder(usersOrder));
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
	public ResponseEntity<OrderPagealeResponse> getOrderByUserId(
			@PathVariable("userId") Long userId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "15", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "usersOrderId", required = false) String sortBy
	){
		User user = new User();
		user.setUserId(userId);
		
		OrderPagealeResponse orderByUserId = this.usersOrderService.getOrderByUserId(user,pageNumber,pageSize,sortBy);
		return new ResponseEntity<OrderPagealeResponse>(orderByUserId,HttpStatus.OK);
	}
	
	// get Orders by orderCode and 
	@GetMapping("/buyer/active/orderCode/{userId}/{orderCode}")
	public ResponseEntity<OrderPagealeResponse> getOrderByOrderCodeAndOrderId(
			@PathVariable("userId") Long userId,
			@PathVariable("orderCode") String orderCode,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "15", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "usersOrderId", required = false) String sortBy
	){
		User user = new User();
		user.setUserId(userId);
		OrderPagealeResponse orderByOrderCodeAndUser = usersOrderService.
				getOrderByOrderCodeAndUser(orderCode,user,pageNumber,pageSize,sortBy);
		return new ResponseEntity<OrderPagealeResponse>(orderByOrderCodeAndUser,HttpStatus.OK);
	}
	
	// get active orders
	@GetMapping("/active")
	public Set<UsersOrder> getActiveOrders(){
		Boolean active = true;
		return this.usersOrderService.getActiveOrder(active);
	}
	
	// get order by seller userName
	@GetMapping("/seller/{sellerUserName}")
	public ResponseEntity<OrderPagealeResponse> getSellersOrder(
			@PathVariable("sellerUserName") String sellerUserName,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "15", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "usersOrderId", required = false) String sortBy
	){
		OrderPagealeResponse orderBySellerUserName = this.usersOrderService.
				getOrderBySellerUserName(sellerUserName,pageNumber,pageSize,sortBy);
		return new ResponseEntity<OrderPagealeResponse>(orderBySellerUserName,HttpStatus.OK);
	}
	
	// delete order 
	@DeleteMapping("/{usersOrderId}")
	public void deleteUsersOrder(@PathVariable("usersOrderId") Long usersOrderId) {
		this.usersOrderService.deleteOrder(usersOrderId);
	}
	
	// get Orders by sellerUserName and active
	@GetMapping("/active/{sellerUsername}")
	public ResponseEntity<OrderPagealeResponse> getActiveOrdersBySellerUserName(
			@PathVariable("sellerUsername") String sellerUsername,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "15", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "usersOrderId", required = false) String sortBy
	){
		OrderPagealeResponse orderBySellerusernameAndActive = usersOrderService.
				getOrderBySellerusernameAndActive(sellerUsername, true,pageNumber,pageSize,sortBy);
		return new ResponseEntity<OrderPagealeResponse>(orderBySellerusernameAndActive,HttpStatus.OK);
	}
	
	// get Orders by orderCode and Active
	@GetMapping("/active/orderCode/{orderCode}")
	public ResponseEntity<OrderPagealeResponse> getOrderByOrderCodeAndActive(
			@PathVariable("orderCode") String orderCode,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "15", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "usersOrderId", required = false) String sortBy,
			@RequestParam(value="active", defaultValue = "true", required = false) Boolean active
	){
		OrderPagealeResponse orderByOrderCodeAndActive = usersOrderService.
				getOrderByOrderCodeAndActive(orderCode,active,pageNumber,pageSize,sortBy);
		return new ResponseEntity<OrderPagealeResponse>(orderByOrderCodeAndActive,HttpStatus.OK);
	}
	


	
	
}
