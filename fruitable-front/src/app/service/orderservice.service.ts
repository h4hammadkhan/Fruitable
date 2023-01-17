import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { UsersOrder } from '../model/UsersOrder';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';
import { Ship } from '../model/ship';

@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  orders:UsersOrder[] =[];

  constructor(
    private http: HttpClient
  ) { }

  // place order
  public placeOrder(userOrder: UsersOrder[]){
    return this.http.post(`${baseUrl}/order/new/`, userOrder);
  }

  // get order by buyer id
  public getOrderByBuyerId(userId:number,pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/order/buyer/${userId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/order/buyer/${userId}`);
    }
  }

  // get order by buyerId and OrderCode
  public getOrderByBuyerIdAndOrderCode(userId:number,orderCode:string,pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/order/buyer/active/orderCode/${userId}/${orderCode}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/order/buyer/active/orderCode/${userId}/${orderCode}`);
    }
  }

  // get orders by seller username
  public getOrderBySellerUsername(userName:string,pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/order/seller/${userName}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/order/seller/${userName}`);
    }
  }

  // get active orders by sellerUserName 
  public getOrdersBySellerUserNameAndActive(userName:string,pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/order/active/${userName}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/order/active/${userName}`);
    }
  }


  // get active orders by OrderCode
  public getOrdersByOrderCodeAndActive(orderCode:string,pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/order/active/orderCode/${orderCode}?pageNumber=${pageNumber}&pageSize=${pageSize}&active=${true}`);
    }else{
      return this.http.get(`${baseUrl}/order/active/orderCode/${orderCode}?active=${true}`);
    }
  }

  // add to Ship
  public addToShip(ship:Ship){
    return this.http.post(`${baseUrl}/ship/`,ship);
  }

  // get All Shipping product
  public getAllShip(pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/ship/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/ship/`);
    }
  }

  // get All active Shipping  product by seller User name
  public getAllShipBySeller(sellerUsername:string,pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/ship/seller/${sellerUsername}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/ship/seller/${sellerUsername}`);
    }
  }

  // get All un active Shipping  product by seller User name
  // OR get completed orders 
  public getCompletedOrders(sellerUsername:string,pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/ship/unactive/seller/${sellerUsername}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }else{
      return this.http.get(`${baseUrl}/ship/unactive/seller/${sellerUsername}`);
    }
  }

  // complete order
  public completeOrder(shipId:number){
    return this.http.post(`${baseUrl}/ship/complete`,shipId);
  }


  // get ship completed order by code and active=false
  public getCompletedOrdersByCode(code:string,pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/ship/code/${code}?pageNumber=${pageNumber}&pageSize=${pageSize}&active=${false}`);
    }else{
      return this.http.get(`${baseUrl}/ship/code/${code}?active=${false}`);
    }
  }

  
  // get shipping ready order by code and active=true
  public getOrdersByCodeAndActiveTrue(code:string,pageNumber?:number,pageSize?:number){
    if(pageNumber != null && pageSize != null){
      return this.http.get(`${baseUrl}/ship/code/${code}?pageNumber=${pageNumber}&pageSize=${pageSize}&active=${true}`);
    }else{
      return this.http.get(`${baseUrl}/ship/code/${code}?active=${true}`);
    }
  }


}
