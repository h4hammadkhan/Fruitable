import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  userDetail!:User;
  userId!:number;
  authority!:string;


  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {

    this.userId = this.loginService.getUserId();
    this.loginService.getCurrentUser().subscribe(
      (data:any)=>{
        this.userDetail = data;
        console.log(data);
        this.authority = data.authorities[0].authority;
      },
      (error)=>{
        console.log(error);
      }
    );

  }

}
