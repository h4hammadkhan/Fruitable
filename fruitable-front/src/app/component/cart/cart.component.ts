import { CartService } from './../../service/cart.service';
import { CartItem } from './../../model/cartItem';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItem: CartItem[] =[];
  totalPrice:number = 0;
  totalQuantity:number = 0;
  constructor(
    private cartService:CartService,
  ) { }

  ngOnInit(): void {
   this.showCartDetails();

  }

  showCartDetails(){


    this.cartService.totalPrice.subscribe(
      value => this.totalPrice = value
    )

    this.cartService.totalQuantity.subscribe(
      value => this.totalQuantity = value
    )

    this.cartItem = this.cartService.getCartFromLocalStorage();
    this.totalPrice = this.cartService.getPriceFormLocalStorage;
    this.totalQuantity = this.cartService.getQuantityFormLocalStorage;

    this.cartService.calculateTotalPrice();





  }

  incrementQuantity(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrementQuantity(productId:number){
    this.cartService.decrementQuantity(productId);
  }

  removeFromCart(productId:number){
    this.cartService.removeFromCart(productId);
  }



}
