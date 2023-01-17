package com.fruitable.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fruitable.Repo.ReportRepo;
import com.fruitable.Service.ReportService;
import com.fruitable.fileResponse.ReportPageableResponse;
import com.fruitable.model.Report;

@Service
public class ReportServiceImpl implements ReportService{

	@Autowired
	private ReportRepo reportRepo;
	
	@Override
	public Report addReport(Report report) {
		return this.reportRepo.save(report);
	}

	@Override
	public Report updateReport(Report report) {
		return this.reportRepo.save(report);
	}

	@Override
	public ReportPageableResponse getAllReport(Integer pageNumber, Integer pageSize, String sortBy) {
		
		Pageable p = PageRequest.of(pageNumber, pageSize, Sort.by(sortBy).descending());
		
		Page<Report> pagePost = this.reportRepo.findAll(p);
		
		List<Report> allPost = pagePost.getContent();
		
		ReportPageableResponse response = new ReportPageableResponse();
		
		response.setContent(allPost);
		response.setPageNumber(pagePost.getNumber());
		response.setPageeSize(pagePost.getSize());
		response.setTotalElements(pagePost.getTotalElements());
		response.setTotalPages(pagePost.getTotalPages());
		response.setLastPage(pagePost.isLast());
		
		return response;
	}

}
