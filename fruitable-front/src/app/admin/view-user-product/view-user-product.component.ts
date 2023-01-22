import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/model/products';
import { ProductserviceService } from 'src/app/service/productservice.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-view-user-product',
  templateUrl: './view-user-product.component.html',
  styleUrls: ['./view-user-product.component.css']
})
export class ViewUserProductComponent implements OnInit {

  product!:Products;
  productId!:number;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productSevice: ProductserviceService,
    private router: Router,
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
      },
      (error)=>{
        console.log(error);
      }
    );
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
          this.productSevice.deleteProduct(productId).subscribe(
            (data)=>{
              console.log(data);
              this.matSnack.open("successfully delete",'',{
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "right",
                panelClass: "snack-success"
              })
              this.router.navigate(['/admin-dashboard/products-list']);
            },
            (error)=>{
              console.log(error);
              this.matSnack.open("Something went wong!!",'',{
                duration: 3000,
                verticalPosition: "top",
                horizontalPosition: "right",
                panelClass: "snack-dander"
              })
            }
          )
        }
      }
    )
  }



}
