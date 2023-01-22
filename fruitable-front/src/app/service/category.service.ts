import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  
  // add category
  public addCategory(category:Category){
    return this.http.post(`${baseUrl}/category/`,category);
  }

  // update category
  public updateCategory(category:Category){
    return this.http.post(`${baseUrl}/category/update/`,category);
  }
  
  // get all categories
  public getCategories(){
    return this.http.get(`${baseUrl}/category/`);
  }
  
  // get all category by id
  public getCategoryById(cateId:number){
    return this.http.get(`${baseUrl}/category/${cateId}`);
  }

  // delete category
  public deleteCategory(cateId:number){
    return this.http.delete(`${baseUrl}/category/${cateId}`);
  }

  

}
