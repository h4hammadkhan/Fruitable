import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Impression } from '../model/impression';
import { ImpressionResponse } from '../model/impressionResponse';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(
    private http: HttpClient
  ) { }

  // vote up
  public voteUp(impression:Impression): Observable<ImpressionResponse> {
    return this.http.post<ImpressionResponse>(`${baseUrl}/impression/up`,impression);
  }

   // vote down
   public voteDown(impression:Impression): Observable<ImpressionResponse> {
    return this.http.post<ImpressionResponse>(`${baseUrl}/impression/down`,impression);
  }


}
