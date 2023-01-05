import { Observable } from 'rxjs';
import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
  ) { }

  public addNewUser(user:User):Observable<User>{
    return this.http.post<User>(`${baseUrl}/user/`,user);
  }

  public addNewSeller(userInfo: User,file: File){
    let formData = new FormData();
    formData.append('user',JSON.stringify(userInfo));
    formData.append('image',file)
    return this.http.post(`${baseUrl}/user/seller`,formData);
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


}
