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

        //Login... set token into local storage
        this.loginService.loginUser(data.token);

        //get current logged user
        this.loginService.getCurrentUser().subscribe(
          (user:any)=>{

            // get authority
            const authority = user.authorities[0].authority;
            const userDetails: {
              userId: number,
              userName: string,
            }={
              userId : user.userId,
              userName : user.userName 
            }
          
            console.log("userDetails:",userDetails);
            
            this.loginService.userDetails(userDetails);

            console.log("----- gettng user details -----");
            console.log(this.loginService.getUserDetails());
            
            

            // set authority iin localStorage
            this.loginService.setRole(authority);

            console.log("getting role:", this.loginService.getRole());
            

            //redirect ...BUYER: buyer-dashboard
            if(authority == "BUYER"){
              this.loginService.loginStatusSubject.next(true);
              this.router.navigate(["/home"]);
            }
            //redirect ...SELLER: seller-dashboard
            else if(authority == "SELLER"){
              this.loginService.loginStatusSubject.next(true);
              this.router.navigate(["/seller-dashboard/add-product"]);
            }
            //redirect ...ADMIN: admin-dashboard
            else if(authority == "ADMIN"){
              this.loginService.loginStatusSubject.next(true);
              this.router.navigate(["/admin-dashboard/users-list"]);
            }
            else{
              this.loginService.logout();
            }
          },
          (error)=>{
            console.log(error);
          }
        );

  

      },
      (err:any)=>{
        console.log(err);
        Swal.fire("Error!!","Invalid Credentials Bad credentials","error");

      }
    )
  }

}
