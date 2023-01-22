import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from 'src/app/service/signup.service';


@Component({
  selector: 'app-seller-change-password',
  templateUrl: './seller-change-password.component.html',
  styleUrls: ['./seller-change-password.component.css']
})
export class SellerChangePasswordComponent implements OnInit {

  changePasswordForm!: FormGroup;
  userId!:string;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private signupService: SignupService,
    private matSnack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {

    this.userId = this.activatedRoute.snapshot.params["uid"];
 

    this.changePasswordForm = this.formBuilder.group({
      userId: this.userId,
      oldPassword: ["",[Validators.required,Validators.minLength(8)]],
      newPassword:["",[Validators.required,Validators.minLength(8)]],
    });

  
  }

  
  updatePassword(){
    this.signupService.changePassword(this.changePasswordForm.value).subscribe(
      (data:any)=>{
        console.log(data);
        this.matSnack.open(`${data.message}`,'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-success"
        })
        this.router.navigate(["/seller-dashboard/profile"]);
      },
      (error)=>{
        console.log(error);
        this.matSnack.open(`${error.error.message}`,'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-dander",
        })
        
      }
    )
  }
    
  get fields(){
    return this.changePasswordForm.controls;
  }


}
