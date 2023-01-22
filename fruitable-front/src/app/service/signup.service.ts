import { Observable } from 'rxjs';
import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { UserResponse } from '../model/UserResponse';
import { ChangePassword } from '../model/changePassword';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
  ) { }

  public addNewUser(user:User):Observable<UserResponse>{
    return this.http.post<UserResponse>(`${baseUrl}/user/`,user);
  }

  public addNewSeller(userInfo: User,file: File):Observable<UserResponse>{
    let formData = new FormData();
    formData.append('user',JSON.stringify(userInfo));
    formData.append('image',file)
    return this.http.post<UserResponse>(`${baseUrl}/user/seller`,formData);
  }

  public uploadProfile(profile:any): Observable<any>{
    return this.http.post<any>(`${baseUrl}/user/upload`,profile,{reportProgress: true, observe: "events"});
  }

  public uploadProfileByUserId(profile:File,userId:number){
    let formData = new FormData();
    formData.append('image',profile);
    return this.http.post(`${baseUrl}/user/upload/${userId}`,formData,{reportProgress: true, observe: "events"});    
  }

  public updateUserInfo(user:User){
    return this.http.post(`${baseUrl}/user/update/`,user);
  }

  //get user by id
  public getUserById(userId:number){
    return this.http.get(`${baseUrl}/user/get/${userId}`);
  }

  //get all users
  public getAllUsers(pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/user/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/user/`);
    }
  }

  // get all buyers
  public getAllBuyers(pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/user/user-role/buyer?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/user/user-role/buyer`);
    }
  }

  // get all sellers
  public getAllSellers(pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/user/user-role/seller?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/user/user-role/seller`);
    }
  }
  
  // lock user
  public lockUser(userId:number){
    return this.http.post(`${baseUrl}/user/lock/${userId}`,'');
  }

  // unlock user
  public UnlockUser(userId:number){
    return this.http.post(`${baseUrl}/user/unlock/${userId}`,'');
  }

  // change password
  public changePassword(passwordInfo:ChangePassword){
    return this.http.post(`${baseUrl}/user/change/password`,passwordInfo);
  }

}
