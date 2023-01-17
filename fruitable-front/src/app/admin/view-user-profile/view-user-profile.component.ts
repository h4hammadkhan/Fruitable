import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { SignupService } from 'src/app/service/signup.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css']
})
export class ViewUserProfileComponent implements OnInit {

  userDetail!:User;
  userId!:number;
  authority!:string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private signupService: SignupService,
    private matSnack: MatSnackBar,
  ) { }

  ngOnInit() {

    this.userId = this.activatedRoute.snapshot.params['id'];
    this.loadUser();
   
  }

  loadUser(){
    this.signupService.getUserById(this.userId).subscribe(
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

  lockUser(userId:number){
    this.signupService.lockUser(userId).subscribe(
      (data)=>{
        this.matSnack.open("successfully Lock",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-success"
        })
      },
      (error)=>{
        console.log(error);
        this.matSnack.open("Something went wong!!",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-dander"
        })
      }
    )
  }

  UnlockUser(userId:number){
    this.signupService.UnlockUser(userId).subscribe(
      (data)=>{
        this.matSnack.open("successfully Unlock",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-success"
        })
      },
      (error)=>{
        console.log(error);
        this.matSnack.open("Something went wong!!",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-dander"
        })
      }
    )
  }

}
