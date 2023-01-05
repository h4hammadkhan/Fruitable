import { Router } from '@angular/router';
import { CartService } from './../../service/cart.service';
import { LoginService } from './../../service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  islogin = false;
  totalQuantity: number = 0;

  constructor(
    private loginService: LoginService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.islogin = this.loginService.isLoggedIn();

    this.cartService.totalQuantity.subscribe(
      (value) => this.totalQuantity = value
    );

    this.cartService.getCartFromLocalStorage();
    this.totalQuantity = this.cartService.getQuantityFormLocalStorage;

    this.loginService.loginStatusSubject.asObservable().subscribe((data)=>{
      this.islogin = this.loginService.isLoggedIn();
    })


  }

  logout() {
    this.loginService.logout();
    this.loginService.loginStatusSubject.next(false);
    this.router.navigate(['/login']);
  }

  navigateToProfile(){
    const role = this.loginService.getRole();
    if(role == "SELLER"){
      this.router.navigate(["seller-dashboard/profile"])
    }else if(role == "ADMIN"){
      this.router.navigate(["admin-dashboard/profile"])

    }else if(role == "BUYER"){
      this.router.navigate(["buyer-dashboard/profile"])
    }
  }
}
