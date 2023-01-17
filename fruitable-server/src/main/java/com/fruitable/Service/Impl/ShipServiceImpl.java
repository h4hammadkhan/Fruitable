package com.fruitable.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.ShipRepository;
import com.fruitable.Service.ShipService;
import com.fruitable.UserOrderModel.Ship;
import com.fruitable.fileResponse.ShipPageableResponse;

@Service
public class ShipServiceImpl implements ShipService{

	
	@Autowired
	private ShipRepository shipRepository;
	
	@Override
	public Ship addToShip(Ship ship) {
		return this.shipRepository.save(ship);
	}

	@Override
	public Ship updateShip(Ship ship) {
		return this.shipRepository.save(ship);
	}

	@Override
	public ShipPageableResponse getAllShip(Integer pageNumber, Integer pageSize,String sortBy) {
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<Ship> pagePost = this.shipRepository.findAll(p);
		
		List<Ship> allPost = pagePost.getContent();
		
		ShipPageableResponse response = new ShipPageableResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
		
	}

	// get all by ship code
	@Override
	public ShipPageableResponse getAllShipByCodeAndActive(String code, Boolean active, Integer pageNumber, Integer pageSize,String sortBy) {
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<Ship> pagePost = this.shipRepository.findByCodeAndActive(code,active,p);
		
		List<Ship> allPost = pagePost.getContent();
		
		ShipPageableResponse response = new ShipPageableResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
	}

	
	// get by ship by
	@Override
	public Ship getByShipId(long shipId) {
		return this.shipRepository.findById(shipId).get();
	}

	// delete 
	@Override
	public void deleteFromShip(long shipId) {
		Ship ship = new Ship();
		ship.setShipId(shipId);
		this.shipRepository.delete(ship);
	}

	
	// get by seller user name
	@Override
	public ShipPageableResponse getAllByActiveAndSeller(Boolean active,String sellerUserName, Integer pageNumber, Integer pageSize,
			String sortBy) {
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<Ship> pagePost = this.shipRepository.findByActiveAndSellerUserName(active,sellerUserName,p);
		
		List<Ship> allPost = pagePost.getContent();
		
		ShipPageableResponse response = new ShipPageableResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
	}

	
}
