import { CartItem } from './../model/cartItem';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] =[];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  getPriceFormLocalStorage = 0;
  getQuantityFormLocalStorage = 0;


  constructor() { }

  addToCart(theCartItem: CartItem){

    let alreadyInCart:boolean = false;
    let existingCartItem: CartItem | undefined;

    if(this.cartItems.length > 0){
      existingCartItem = this.cartItems.find(temp=> temp.productId == theCartItem.productId);
      alreadyInCart = (existingCartItem != undefined);
    }

    if(alreadyInCart && existingCartItem?.quantity! < existingCartItem?.stock!){
      existingCartItem!.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

    this.calculateTotalPrice();
    localStorage.setItem('cartData',JSON.stringify(this.cartItems));

 }

  calculateTotalPrice() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentItem of this.cartItems){
      totalPriceValue += currentItem.quantity * currentItem.price;
      totalQuantityValue += currentItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    localStorage.setItem('totalPrice',JSON.stringify(totalPriceValue));
    this.totalQuantity.next(totalQuantityValue);
    localStorage.setItem('totalQuantity',JSON.stringify(totalQuantityValue));
  }


  decrementQuantity(productId:number){

    let item = this.cartItems.find(temp => temp.productId == productId);
    item!.quantity--;

    if(item?.quantity == 0){
      this.removeFromCart(item.productId);
    }
    else{
      this.calculateTotalPrice();
    }

    localStorage.setItem('cartData',JSON.stringify(this.cartItems));

  }

  removeFromCart(productId:number){

    let itemIndex = this.cartItems.findIndex(temp => temp.productId == productId);

    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);
      this.calculateTotalPrice();
    }

    localStorage.setItem('cartData',JSON.stringify(this.cartItems));

  }


  getCartFromLocalStorage(){

      const item = JSON.parse(localStorage.getItem('cartData')!);
      const price = JSON.parse(localStorage.getItem('totalPrice')!);
      const qty = JSON.parse(localStorage.getItem('totalQuantity')!);
      if(item){
        item.forEach((element:CartItem) => {
          if(this.cartItems.find(temp => temp.productId == element.productId)){

          }
          else{
            this.cartItems.push(element);
            this.getPriceFormLocalStorage = price;
            this.getQuantityFormLocalStorage = qty

          }
        });
      }

      return this.cartItems;

  }



}
