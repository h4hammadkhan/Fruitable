import { Component } from '@angular/core';
import { LoginService } from './service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Fruitable';
  islogin = false;
  primaryColor = "#7fb602";
  constructor(
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    this.islogin = this.loginService.isLoggedIn();

    this.loginService.loginStatusSubject.asObservable().subscribe((data)=>{
      this.islogin = this.loginService.isLoggedIn();
    })


  }


}
