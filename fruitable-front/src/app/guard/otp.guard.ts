import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ForgotPasswordService } from '../service/forgotPassword.service';

@Injectable({
  providedIn: 'root'
})
export class OtpGuard implements CanActivate {


  constructor(
     private forgotPassService: ForgotPasswordService,
     private router: Router,
  ){}

  sub!: Subscription;
  active!:boolean;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
   this.sub = this.forgotPassService.isSendOPTSubject.asObservable().subscribe(
      (data)=> this.active = data
    )
    console.log("active:",this.active);
    if(this.active){
      return true;      
    }
    this.router.navigate(['/login'])
    return false;
  }
  
}
