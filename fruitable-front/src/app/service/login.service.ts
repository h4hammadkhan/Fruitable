import { LoginData } from './../model/login-data';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(
    private http: HttpClient,
  ) { }


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
    return true;
  }


}
