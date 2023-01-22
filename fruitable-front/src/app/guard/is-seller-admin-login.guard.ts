import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class IsSellerAdminLoginGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
   
      if(this.loginService.isLoggedIn() && this.loginService.getRole()=="SELLER"){
        this.router.navigate(['/seller-dashboard/add-product'])
        return false;
      }
      else if(this.loginService.isLoggedIn() && this.loginService.getRole()=="ADMIN"){
        this.router.navigate(['/admin-dashboard/user-report'])
        return false;
      }
   
      return true;
  }
  
}
