import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ReportPageableResponse } from 'src/app/model/ReportPageableResponse';
import { ReportService } from 'src/app/service/report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  reports!:ReportPageableResponse
  pageEvent!: PageEvent;

  constructor(
    private reportService: ReportService,
  ) { }

  ngOnInit() {
    this.getReports();
  }

  getReports(){
    this.reportService.getAllReport().subscribe(
      (data:any)=>{
        console.log(data);
        this.reports = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onPaginateChange(event: PageEvent){
    let pageNumber = event.pageIndex; 
    let pageSize = event.pageSize;
    this.reportService.getAllReport(pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.reports = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
