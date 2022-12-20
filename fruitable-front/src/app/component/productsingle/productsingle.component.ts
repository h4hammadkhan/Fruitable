import { CartItem } from './../../model/cartItem';
import { CartService } from './../../service/cart.service';
import { ProductserviceService } from './../../service/productservice.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from './../../model/product';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.css']
})
export class ProductsingleComponent implements OnInit {

  product!:Product;
  productId!:number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductserviceService,
    private cartService: CartService,

  ) { }

  ngOnInit(): void {

    this.productId = this.activatedRoute.snapshot.params['pid'];

    this.getProductsById();

  }

  getProductsById(){
    this.productService.getProductById(this.productId).subscribe(
      (data:Product)=>{
        this.product = data;

      },
      (err)=>{
        console.log(err);
        Swal.fire("Error","Error in fetching data!!","error")
      }
    )

  }

  addToCart(){
    const cartItem = new CartItem(this.product);
    this.cartService.addToCart(cartItem);
  }






}
