import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-admin-dashboardsidebar',
  templateUrl: './admin-dashboardsidebar.component.html',
  styleUrls: ['./admin-dashboardsidebar.component.css']
})
export class AdminDashboardsidebarComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(){

    this.loginService.logout();
    this.loginService.loginStatusSubject.next(false);
    this.router.navigate(['/login']);

  }

}
