import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = request; 
        //add the jwt token (localStorage) request
        const token = this.loginService.getToken();
        console.log("inside interceptor");
        // console.log(`Bearer ${token}`);
        
        if(token!=null){
            authReq=authReq.clone(
            {
                setHeaders:{Authorization:`Bearer ${token}`}
            })
        }

        return next.handle(authReq);
  }
}

export const AuthInterceptorProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
]
