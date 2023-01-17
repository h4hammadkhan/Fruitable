import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';
import { SignupService } from 'src/app/service/signup.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {

  updateProfileForm!: FormGroup;
  updatedProfileImage!: File | any;
  currentProfile!:string;
  imageSrc!:any;
  progress!: number;
  imageStatus!:string;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private signupService: SignupService,
  ) { }

  ngOnInit() {
    this.updateProfileForm = this.formBuilder.group({
      userId: ["", Validators.required],
      first_name:["",Validators.required],
      last_name:["",Validators.required],
      email:["",Validators.required],
      phone:["",Validators.required],
      address:["",Validators.required],
      userName:["",Validators.required],
      password:["",Validators.required],
      profile_image:["",Validators.required],
      impression:["",Validators.required],
    });

    this.getCurrentUserData();
  }


  getCurrentUserData() {
    this.loginService.getCurrentUser().subscribe(
      (data: any) => {
        this.updateProfileForm.patchValue({
          userId: data.userId,
          first_name:data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          userName: data.userName,
          password: data.password,
          profile_image: data.profile_image,
          impression: data.impression,
        });

        this.currentProfile = data.profile_image;
        
      },
      (error) => {
        console.log(error);
      }
    )
  }

  get fields(){
    return this.updateProfileForm.controls;
  }

  selectImg(event:any){
    console.log(event.target.files[0]);
    if(event.target.files && event.target.files[0]){
      const file = event.target.files[0];
      this.updatedProfileImage = file;

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  uploadProfile(){
    const userId = this.fields['userId'].value;

    this.signupService.uploadProfileByUserId(this.updatedProfileImage,userId).subscribe(
      (event:any)=>{
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
            this.imageStatus = event.body.message;

            setTimeout(() => {
              this.progress = 0;
            }, 3000);
        }
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  update() {
    this.signupService.updateUserInfo(this.updateProfileForm.value).subscribe(
      (data:any)=>{
        Swal.fire("Success","Successfully updated !!","success");
      },
      (error)=>{
        Swal.fire("Error","Error in updating !!","error");
      }
    )
  }
}
