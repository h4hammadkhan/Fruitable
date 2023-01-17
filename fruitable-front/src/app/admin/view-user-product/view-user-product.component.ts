import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/model/products';
import { ProductserviceService } from 'src/app/service/productservice.service';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './view-user-product.component.html',
  styleUrls: ['./view-user-product.component.css']
})
export class ViewUserProductComponent implements OnInit {

  product!:Products;
  productId!:number;
  authority!:string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productSevice: ProductserviceService,
    private matSnack: MatSnackBar,
  ) { }

  ngOnInit() {

    this.productId = this.activatedRoute.snapshot.params['pid'];
    
    this.loadUser();
   
  }

  loadUser(){
    this.productSevice.getSingleProduct(this.productId).subscribe(
      (data:any)=>{
        this.product = data;
        console.log(data);
        // this.authority = data.authorities[0].authority;
      },
      (error)=>{
        console.log(error);
      }
    );
  }



}
