import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { UserPageableResponse } from 'src/app/model/UserPageableResponse';
import { SignupService } from 'src/app/service/signup.service';

@Component({
  selector: 'app-usersList',
  templateUrl: './sellersList.component.html',
  styleUrls: ['./sellersList.component.css']
})
export class SellersListComponent implements OnInit {

  Users!:UserPageableResponse;
  pageEvent!: PageEvent;

  constructor(
    private signupService: SignupService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.signupService.getAllSellers().subscribe(
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
    this.signupService.getAllSellers(pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.Users = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
