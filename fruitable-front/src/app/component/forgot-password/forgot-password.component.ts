import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ForgotPasswordService } from 'src/app/service/forgotPassword.service';
import { ForgotPasswordResponse } from 'src/app/model/forgotPasswordResponse';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  verifyOtpForm!: FormGroup;
  isForgotForm = true;
  Otp!:FormGroup;
  message!:string;
  userId!:number;
  error = false;
  constructor(
    private formBuilder: FormBuilder,
    private forgotPassService: ForgotPasswordService,
    private router: Router,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {

    // form for username 
    this.forgotPasswordForm = this.formBuilder.group({
      userName:['',Validators.required],
    })

    // form for otp verification
    this.verifyOtpForm = this.formBuilder.group({
      userOtp:['',Validators.required]
    })

    this.Otp = this.formBuilder.group({
      otpId:['',Validators.required],
      oneTimePassword:['',Validators.required],
      date:['',Validators.required],
      user: this.formBuilder.group({
        userId: ['',Validators.required],
      })
    })

  }

  get forgotField(){
    return this.forgotPasswordForm.controls;
  }

  get verifyField(){
    return this.verifyOtpForm.controls;
  }

  sendOTP(){
    let userName = this.forgotPasswordForm.controls['userName'].value;    
    this.forgotPassService.sendOtp(userName).subscribe(
      (data:ForgotPasswordResponse)=>{
        this.message = data.message;
        this.isForgotForm = false;
        this.userId = data.otp.user.userId
        this.Otp.patchValue({
          otpId: data.otp.otpId,
          oneTimePassword: data.otp.oneTimePassword,
          date: data.otp.date,
          user:{
            userId: data.otp.user.userId
          }
        })
        this.snack.open("Successfully send OTP!!",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-success"
        });
      },
      (error)=>{
        console.log(error);
        this.message = error.error.message;
        this.snack.open(`${error.error.message}`,'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-dander"
        });
      }
    )    
  }


  verify(){
    let userOtp = this.verifyOtpForm.controls['userOtp'].value;
    this.forgotPassService.verifyOtp(userOtp,this.Otp.value).subscribe(
      (data:any)=>{
        this.snack.open(`${data.message}`,'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-success"
        }); 
        this.forgotPassService.isSendOPTSubject.next(true);
        this.router.navigate(['/change-forgot-password/'+btoa(JSON.stringify(this.userId))]);
      },
      (error)=>{
        this.message = error.error.message;
        this.error = true;
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
