package com.fruitable.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fruitable.Service.ReportService;
import com.fruitable.fileResponse.OrderPagealeResponse;
import com.fruitable.fileResponse.ReportPageableResponse;
import com.fruitable.model.Report;
import com.fruitable.model.User;

@RestController
@CrossOrigin("*")
@RequestMapping("/report")
public class ReportController {

	@Autowired
	private ReportService reportService;
	
	// add report
	@PostMapping("/")
	public Report addReport(@RequestBody Report report) {
		return this.reportService.addReport(report);
	}

	// update report
	@PostMapping("/update")
	public Report updateReport(@RequestBody Report report) {
		return this.reportService.updateReport(report);
	}
	
	// get All report
	@GetMapping("/")
	public ResponseEntity<ReportPageableResponse> getAllReport(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize,
			@RequestParam(value="sortBy", defaultValue = "reportId", required = false) String sortBy
	){

		ReportPageableResponse allReport = this.reportService.getAllReport(pageNumber, pageSize, sortBy);
		return new ResponseEntity<ReportPageableResponse>(allReport,HttpStatus.OK);
	
	}
	
	
}
