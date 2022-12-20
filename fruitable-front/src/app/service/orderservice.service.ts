import { UserOrder } from 'src/app/model/userOrder';
import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  orders:UserOrder[] =[];

  constructor() { }

  public placeOrder(userOrder: UserOrder){

    const item = JSON.parse(localStorage.getItem('order')!);
    this.orders.splice(0,this.orders.length);
    if(item){
      item.forEach((element:UserOrder) => {
        this.orders.push(element);
      });
      this.orders.push(userOrder);

    }
    else{
      this.orders.push(userOrder);
    }

    localStorage.setItem('order',JSON.stringify(this.orders));
  }

  public getOderDetails(){
    return JSON.parse(localStorage.getItem('order')!);
  }





}
