import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ForgotPasswordResponse } from '../model/forgotPasswordResponse';
import { OTP } from '../model/OTP';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  public isSendOPTSubject = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  // send OTP via User Email
  public sendOtp(userName:string): Observable<ForgotPasswordResponse>{
    return this.http.post<ForgotPasswordResponse>(`${baseUrl}/forgot/send-otp/${userName}`,'');
  }

  // verify OTP
  public verifyOtp(userOtp:number,OTP:OTP){
    return this.http.post(`${baseUrl}/forgot/verify/${userOtp}`,OTP);
  }

  // change forgot password 
  public changeForgotPassword(userId:number,password:string){
    return this.http.post(`${baseUrl}/user/change/forgot-password/${userId}/${password}`,'');
  }


}
