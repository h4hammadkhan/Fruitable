package com.fruitable.Repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.UserOrderModel.Ship;

public interface ShipRepository extends JpaRepository<Ship, Long>{

	// get by code and active
	Page<Ship> findByCodeAndActive(String code,Boolean active,Pageable p);
	
	// get by active and sellerUserName
	Page<Ship> findByActiveAndSellerUserName(Boolean active,String sellerUserName,Pageable p);
	
	
}
