import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignupService } from '../../service/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import Swal from 'sweetalert2';
import { UserResponse } from 'src/app/model/UserResponse';

@Component({
  selector: 'app-signup',
  templateUrl: './signup-buyer.component.html',
  styleUrls: ['./signup-buyer.component.css']
})
export class SignupBuyerComponent implements OnInit {

  user!:User;
  userForm!:FormGroup;
  hide = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private snack: MatSnackBar,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      userName:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(8)]],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required]
    })

  }

  get getFields(){
    return this.userForm.controls;
  }

  onSubmit(){
    this.user = this.userForm.value;
    console.log(this.user);
    this.signupService.addNewUser(this.user).subscribe(
      (data:UserResponse)=>{
        console.log(data);
  
        Swal.fire("Success",`${data.message}`,"success").then(
          (ok)=>{
            this.router.navigate(['/login']);
          }
        )

      },
      (err:any)=>{
        console.log(err);
        Swal.fire("Error",`${err.error.message}`,"error");
      }
    )

  }

}
