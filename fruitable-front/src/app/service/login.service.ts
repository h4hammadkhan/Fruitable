import { LoginData } from './../model/login-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import baseUrl from './helper';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) { }

  // get current user: which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: LoginData){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }


  public loginUser(token: string){
    localStorage.setItem('token',token);
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }


  public isLoggedIn(){
    let tokenStr = this.getToken();
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }
    else{
      return true;
    }
  }


  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('uuid');
    localStorage.removeItem('role');
    return true;
  }

  public setRole(role:any){
    localStorage.setItem('role',role);
  }

  public getRole(){
    return localStorage.getItem('role');
  }

  public setUserDetails(userDetails:any){
    localStorage.setItem('uuid',JSON.stringify(userDetails));
  }

  public getUserDetails(){
    let ud = localStorage.getItem('uuid');
    if(ud !=null){
      return JSON.parse(ud);
    }
    else{
      this.logout();
      return null;
    }
  }

  public getUserId(){
    const ud = this.getUserDetails();
    return ud.userId;
  }

}
