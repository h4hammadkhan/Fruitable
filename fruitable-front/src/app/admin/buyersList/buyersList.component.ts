import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ReportPageableResponse } from 'src/app/model/ReportPageableResponse';
import { UserPageableResponse } from 'src/app/model/UserPageableResponse';
import { ReportService } from 'src/app/service/report.service';
import { SignupService } from 'src/app/service/signup.service';

@Component({
  selector: 'app-usersList',
  templateUrl: './buyersList.component.html',
  styleUrls: ['./buyersList.component.css']
})
export class BuyersListComponent implements OnInit {

  Users!:UserPageableResponse;
  pageEvent!: PageEvent;

  constructor(
    private reportService: ReportService,
    private signupService: SignupService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.signupService.getAllBuyers().subscribe(
      (data:any)=>{
        console.log(data);
        this.Users = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  onPaginateChange(event: PageEvent){
    let pageNumber = event.pageIndex; 
    let pageSize = event.pageSize;
    this.signupService.getAllBuyers(pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.Users = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
