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
      profile_image:'default.png',
    });
    
  }
  
  get getFields(){
    return this.userForm.controls;
  }
  
  selectImg(event: any){
    let formData = new FormData();
    console.log(event.target.files[0])
    this.profile = event.target.files[0];
    formData.append('image',this.profile);
    this.signupService.uploadProfile(formData).subscribe(
      (event: any) =>{
        switch(event.type){
          case HttpEventType.Sent:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            var eventTotal = event.total ? event.total : 0;
            this.progress = Math.round(event.loaded / eventTotal * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('Image Upload Successfully!', event.body);
            console.log("check:",event.body.fileName);
            this.userPersonalFormGroup.controls['profile_image'].setValue(event.body.fileName);
            this.profileUploadMsg = event.body.message;

            setTimeout(() => {
              // this.progress = 0;
            }, 1500);
            
          
        }
      },
      error =>{

      }
    )
    // this.signupService.uploadProfile(formData).subscribe(
    //   (data:any)=>{
    //     console.log(data);
    //     this.userPersonalFormGroup.controls['profile_image'].setValue(data.fileName);
    //   },
    //   (err)=>{
    //     console.log(err);
    //   }
    // )
    
  }

  onSubmit(){

    this.user = this.userDetailFormGroup.value;
    this.user.address = this.userPersonalFormGroup.controls['address'].value;
    this.user.profile_image = this.userPersonalFormGroup.controls['profile_image'].value;
    console.log(this.user);
    
    // this.user = this.userForm.value;
    // console.log(this.user);
    this.signupService.addNewSeller(this.user).subscribe(
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
