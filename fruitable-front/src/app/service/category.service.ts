import { Product } from './../model/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }


  public getAllCategories(){
    return this.http.get("https://fakestoreapi.com/products/categories");
  }

  public getProductByCategory(cate:string):Observable<Product[]>{
    return this.http.get<Product[]>(`https://fakestoreapi.com/products/category/${cate}`)
  }

}
