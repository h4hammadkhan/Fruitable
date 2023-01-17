package com.fruitable.Service.Impl;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.UsersOrderRepository;
import com.fruitable.Service.UsersOrderService;
import com.fruitable.UserOrderModel.UsersOrder;
import com.fruitable.fileResponse.OrderPagealeResponse;
import com.fruitable.fileResponse.ProductPagealeResponse;
import com.fruitable.model.User;
import com.fruitable.model.product.Product;


@Service
public class UsersOrderServiceImpl implements UsersOrderService{

	@Autowired
	private UsersOrderRepository usersOrderRepository;

	// add order
	@Override
	public Set<UsersOrder> addUserOrder(UsersOrder[] usersOrder) {
		return new HashSet<>(this.usersOrderRepository.saveAll(List.of(usersOrder)));
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
	public OrderPagealeResponse getOrderByUserId(User user,Integer pageNumber, Integer pageSize,String sortBy) {
		
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<UsersOrder> pagePost = this.usersOrderRepository.findByuser(user,p);
		
		List<UsersOrder> allPost = pagePost.getContent();
		
		OrderPagealeResponse response = new OrderPagealeResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
	
	}

	// get active order
	@Override
	public Set<UsersOrder> getActiveOrder(Boolean active) {
		return new HashSet<>(this.usersOrderRepository.findByactive(active));
	}

	// get order by seller userName
	@Override
	public OrderPagealeResponse getOrderBySellerUserName(
			String sellerUserName,Integer pageNumber, Integer pageSize,String sortBy
	) {
		
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<UsersOrder> pagePost = usersOrderRepository.findBysellerUserName(sellerUserName,p);
		
		List<UsersOrder> allPost = pagePost.getContent();
		
		OrderPagealeResponse response = new OrderPagealeResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
	}

	// delete Order
	@Override
	public void deleteOrder(Long usersOrderId) {
		UsersOrder usersOrder = new UsersOrder();
		usersOrder.setUsersOrderId(usersOrderId);
		this.usersOrderRepository.delete(usersOrder);		
	}

	@Override
	public OrderPagealeResponse getOrderBySellerusernameAndActive(
			String username, Boolean active,Integer pageNumber, Integer pageSize,String sortBy
	) {
		
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<UsersOrder> pagePost = usersOrderRepository.findBySellerUserNameAndActive(username, active,p);
		
		
		List<UsersOrder> allPost = pagePost.getContent();
		
		OrderPagealeResponse response = new OrderPagealeResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
		
	}

	@Override
	public OrderPagealeResponse getOrderByOrderCodeAndActive(String orderCode, Boolean active, Integer pageNumber,
			Integer pageSize, String sortBy) {
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<UsersOrder> pagePost = usersOrderRepository.findByOrderCodeAndActive(orderCode, active,p);
		
		List<UsersOrder> allPost = pagePost.getContent();
		
		OrderPagealeResponse response = new OrderPagealeResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
	}

	@Override
	public OrderPagealeResponse getOrderByOrderCodeAndUser(String orderCode, User user,
			Integer pageNumber, Integer pageSize, String sortBy) {
		
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<UsersOrder> pagePost = usersOrderRepository.findByOrderCodeAndUser(orderCode,user,p);
		
		List<UsersOrder> allPost = pagePost.getContent();
		
		OrderPagealeResponse response = new OrderPagealeResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
	}



}