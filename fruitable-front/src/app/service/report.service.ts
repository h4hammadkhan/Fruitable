import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  // add report
  public addReport(report:any){
    return this.http.post(`${baseUrl}/report/`,report);
  }

  // get all report
  public getAllReport(pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/report/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/report/`);
    }
  }

}
