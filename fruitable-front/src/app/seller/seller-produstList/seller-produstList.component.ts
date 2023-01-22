import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductPageableResponse } from 'src/app/model/ProductPageableResponse';
import { LoginService } from 'src/app/service/login.service';
import { ProductserviceService } from 'src/app/service/productservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-produstList',
  templateUrl: './seller-produstList.component.html',
  styleUrls: ['./seller-produstList.component.css']
})
export class SellerProdustListComponent implements OnInit {

  products!:ProductPageableResponse;
  pageEvent!: PageEvent;
  userId!:number;
  productImage!: any;

  constructor(
    private productService: ProductserviceService,
    private loginService: LoginService,
  ) { }

  ngOnInit() {
   
    this.getProductsByUser();
  }

  getImage(imageName:string){
    this.productService.serveProductImage(imageName).subscribe(
      (data)=>{

      },(error)=>{
        console.log(error);
        
      }
    )
  }
  // get all products by userId
  public getProductsByUser(){
    this.userId = this.loginService.getUserId();
    this.productService.getProductsByUser(this.userId).subscribe(
      (data:ProductPageableResponse)=>{
        this.products = data;
        console.log(this.products);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  onPaginateChange(event: PageEvent){
    let pageNumber = event.pageIndex; 
    let pageSize = event.pageSize;
    this.productService.getProductsByUser(this.userId,pageNumber,pageSize).subscribe(
      (data:ProductPageableResponse)=>{
        this.products = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  deleteImage(){
    this.productService.deleteImage(this.productImage).subscribe(
      (data)=>{
        console.log(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  // delete product
  public deleteProduct(productId:number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'cancel',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#7fb602',
      confirmButtonAriaLabel: "hk",
    }).then(
      (yes)=>{
        if(yes.isConfirmed){
          this.productService.deleteProduct(productId).subscribe(
            (data)=>{
              console.log(data);
              this.getProductsByUser();
            },
            (error)=>{
              console.log(error);
            }
          )
        }
      }
    )
  }

}
