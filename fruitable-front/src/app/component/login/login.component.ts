import { LoginData } from './../../model/login-data';
import { LoginService } from './../../service/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin!: FormGroup;
  logindata!:LoginData;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.userLogin = this.formBuilder.group({
      userName:['',Validators.required],
      password:['',Validators.required],
    })
  }

  get fields(){
    return this.userLogin.controls;
  }
  login(){
    this.logindata = this.userLogin.value;

    // request server to generate token
    this.loginService.generateToken(this.logindata).subscribe(
      (data:any)=>{

        console.log("success",data);
        
        this.snack.open("Successfully Logged in",'',{
          duration:3000,
        })

        //Login... set token into local storage
        this.loginService.loginUser(data.token);

        // Swal.fire("success","Successfuly login!!!","success");
        this.loginService.loginStatusSubject.next(true);
        this.router.navigate(["/dashboard/addProduct"]);

      },
      (err:any)=>{
        console.log(err);
        Swal.fire("Error!!","Invalid Credentials Bad credentials","error");

      }
    )
  }

}
