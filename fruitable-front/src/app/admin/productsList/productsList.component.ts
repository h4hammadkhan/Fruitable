import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductPageableResponse } from 'src/app/model/ProductPageableResponse';
import { UserPageableResponse } from 'src/app/model/UserPageableResponse';
import { ProductserviceService } from 'src/app/service/productservice.service';
import { SignupService } from 'src/app/service/signup.service';

@Component({
  selector: 'app-usersList',
  templateUrl: './productsList.component.html',
  styleUrls: ['./productsList.component.css']
})
export class ProductsListComponent implements OnInit {

  products!:ProductPageableResponse;
  pageEvent!: PageEvent;

  constructor(
    private signupService: SignupService,
    private productService: ProductserviceService,
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }


  getAllUsers(){
    this.productService.getProducts().subscribe(
      (data:any)=>{
        console.log(data);
        this.products = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  onPaginateChange(event: PageEvent){
    let pageNumber = event.pageIndex; 
    let pageSize = event.pageSize;
    this.productService.getProducts(pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.products = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
