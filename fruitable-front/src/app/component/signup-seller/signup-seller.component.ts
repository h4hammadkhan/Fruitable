import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
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
      phone: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(8)]],
    });
    this.userPersonalFormGroup = this.formBuilder.group({
      address: ['', Validators.required],
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
    this.user.address = this.userPersonalFormGroup.controls['address'].value;
    console.log(this.user);
    this.signupService.addNewSeller(this.user,this.profile).subscribe(
      (data:any)=>{
        Swal.fire("Success","Successfully registered!!","success").then(
          (ok)=>{
            this.router.navigate(['/login']);
          }
        )
      },
      (err)=>{
        console.log(err);
        Swal.fire("Error","Error in register user!!","error");
      }
    )

  }
}
