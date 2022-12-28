import { Product } from './../model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Products } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(
    private http:HttpClient,
  ) { }


  public addNewProduct(product:Products){
    return this.http.post(`${baseUrl}/product/`,product);
  } 

  public uploadProductImage(file:any){
    return this.http.post(`${baseUrl}/product/upload/`,file,{reportProgress: true,observe: "events"});
  }

// ----- ---- ---- ----- ---- ---- ----- ----  //

  public getLimitProducts(limit:number):Observable<Product[]>{
    return this.http.get<Product[]>(`https://fakestoreapi.com/products?limit=${limit}`);
  }

  // get all products
  public getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  // get product by id
  public getProductById(productId:number):Observable<Product>{
    return this.http.get<Product>(`https://fakestoreapi.com/products/${productId}`);
  }

  // add new Product
  public addProduct(product:Product){
    return this.http.post('https://fakestoreapi.com/products',product);
  }



}
