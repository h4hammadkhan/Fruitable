package com.fruitable.Service;


import com.fruitable.fileResponse.ReportPageableResponse;
import com.fruitable.model.Report;

public interface ReportService {

	// add report
	public Report addReport(Report report);
	
	// update report
	public Report updateReport(Report repot);
	
	// get all report
	public ReportPageableResponse getAllReport(Integer pageNumber, Integer pageSize, String sortBy); 
	
	
}
