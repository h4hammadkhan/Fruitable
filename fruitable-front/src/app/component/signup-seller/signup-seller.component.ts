import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserResponse } from 'src/app/model/UserResponse';
import { SignupService } from 'src/app/service/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-seller',
  templateUrl: './signup-seller.component.html',
  styleUrls: ['./signup-seller.component.css']
})
export class SignupSellerComponent implements OnInit {

  user!:User;
  userForm!:FormGroup;
  userDetailFormGroup!: FormGroup;
  userPersonalFormGroup!: FormGroup;
  profile!:any;
  progress: number = 0;
  profileUploadMsg: string = '';
  hide = true;


  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private snack: MatSnackBar,
    private router: Router,
  ) { }

  
  ngOnInit(): void {
    
    this.userDetailFormGroup = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,Validators.minLength(8)]],
    });
    this.userPersonalFormGroup = this.formBuilder.group({
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      cnic: ['', Validators.required],
    });
    
  }
  
  get getFields(){
    return this.userForm.controls;
  }
  
  selectImg(event: any){
    console.log(event.target.files[0])
    this.profile = event.target.files[0];  
  }

  onSubmit(){

    this.user = this.userDetailFormGroup.value;
    this.user.phone = this.userPersonalFormGroup.controls['phone'].value;
    this.user.address = this.userPersonalFormGroup.controls['address'].value;
    this.user.city = this.userPersonalFormGroup.controls['city'].value;
    this.user.cnic = this.userPersonalFormGroup.controls['cnic'].value;
    console.log(this.user);
    this.signupService.addNewSeller(this.user,this.profile).subscribe(
      (data:UserResponse)=>{
        Swal.fire("Success",`${data.message}`,"success").then(
          (ok)=>{
            this.router.navigate(['/login']);
          }
        )
      },
      (err:any)=>{
        console.log(err);
        Swal.fire("Error",`${err.error.message? err.error.message:err.error.error}`,"error");
      }
    )

  }
}
