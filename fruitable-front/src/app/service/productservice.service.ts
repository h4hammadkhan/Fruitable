import { Product } from './../model/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Products } from '../model/products';
import { ProductPageableResponse } from '../model/ProductPageableResponse';
import { UsersOrder } from '../model/UsersOrder';

@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  constructor(
    private http:HttpClient,
  ) { }

  // add new product
  public addNewProduct(product:Products){
    return this.http.post(`${baseUrl}/product/`,product);
  } 

  // add product with product image
  public addNewProductWithImage(Product:Products,file:File){
    const formData = new FormData();
    formData.append("product",JSON.stringify(Product));
    formData.append("image",file);
    return this.http.post(`${baseUrl}/product/add`,formData);
  }

  // upload product image
  public uploadProductImage(file:any){
    return this.http.post(`${baseUrl}/product/upload/`,file,{reportProgress: true,observe: "events"});
  }

  // get all products by userId
  public getProductsByUser(userId:number,pageNumber?:number,pageSize?:number): Observable<ProductPageableResponse>{
    if(pageNumber != null && pageSize != null){
      return this.http.get<ProductPageableResponse>(`${baseUrl}/product/user/all/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get<ProductPageableResponse>(`${baseUrl}/product/user/all/${userId}`);
    }
  }

  // get/serve product image
  public serveProductImage(imageName:string){
    return this.http.get(`${baseUrl}/product/productImage/${imageName}`);
  }

  // get product by id
  public getSingleProduct(productId:number){
    return this.http.get(`${baseUrl}/product/${productId}`);
  }

  // get all products
  public getProducts(pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/product/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/product/`);
    }
  }

  // update product
  public updateProduct(product:Products,file:File){
    const formData = new FormData();
    formData.append("product",JSON.stringify(product));
    formData.append("image",file);
    return this.http.post(`${baseUrl}/product/update/`,formData);
  } 

  // update product quantity
  public updateProductQty(products:UsersOrder[]){
    return this.http.post(`${baseUrl}/product/update/productQty/`,products);
  }

  // delete product
  public deleteProduct(productId:number){
    return this.http.delete(`${baseUrl}/product/${productId}`);
  }

  // delete product Image
  public deleteImage(productImage:string){  
    return this.http.delete(`${baseUrl}/product/delete/${productImage}`);
  }




}
