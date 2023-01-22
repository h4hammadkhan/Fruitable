import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordService } from 'src/app/service/forgotPassword.service';


@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  changePassword!: FormGroup;
  userId!:number;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private forgotPassService: ForgotPasswordService,
    private router: Router,
    private snack: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    
    this.userId = JSON.parse(atob(this.activatedRoute.snapshot.params['uid']));


    this.changePassword = this.formBuilder.group({
      userId: this.userId,
      password: ['',[Validators.required,Validators.minLength(8)]]
    })


  }

  get fields(){
    return this.changePassword.controls;
  }

  change(){
    let password = this.changePassword.controls['password'].value;
    let userId = this.changePassword.controls['userId'].value;
    this.forgotPassService.changeForgotPassword(userId,password).subscribe(
      (data:any)=>{
        console.log(data);
        this.snack.open(`${data.message}`,'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-success"
        });
        this.router.navigate(['/login']);
      },
      (error)=>{
        console.log(error);
        this.snack.open(`${error.error.message}`,'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-dander"
        });
      }
    )
  }



}
