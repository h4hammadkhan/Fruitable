import { CartItem } from './../../model/cartItem';
import { CartService } from './../../service/cart.service';
import { ProductserviceService } from './../../service/productservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Products } from 'src/app/model/products';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {

  Product!:Products;
  productId!:number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductserviceService,
    private cartService: CartService,
    private loginSevice: LoginService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.productId = this.activatedRoute.snapshot.params['pid'];

    this.getProductsById();

  }

  getProductsById(){
    this.productService.getSingleProduct(this.productId).subscribe(
      (data:any)=>{
        console.log(data);
        this.Product = data;
      },
      (err)=>{
        console.log(err);
        Swal.fire("Error","Error in fetching data!!","error")
      }
    )

  }

  addToCart(){
    if(this.loginSevice.getToken()==null){
      this.router.navigate(['/login']);
    }else{
      const cartItem = new CartItem(this.Product);
      this.cartService.addToCart(cartItem);
    }
  }






}
