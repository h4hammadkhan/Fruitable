import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-seller-dashboardsidebar',
  templateUrl: './seller-dashboardsidebar.component.html',
  styleUrls: ['./seller-dashboardsidebar.component.css']
})
export class SellerDashboardsidebarComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(){

    this.loginService.logout();
    this.loginService.loginStatusSubject.next(false);
    this.loginService.roleStatusSubject.next(true);
    this.router.navigate(['/login']);

  }

}
