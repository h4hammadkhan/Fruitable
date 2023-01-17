package com.fruitable.Repo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.fruitable.model.Report;

public interface ReportRepo extends JpaRepository<Report, Long>{
	
	// get report by seller UserName
	Page<Report> findByBuyerUserName(String buyerUserName, Pageable p);
	
	
}
