import { OrderserviceService } from '../../service/orderservice.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { OrderPageableResponse } from 'src/app/model/OrderPageableResponse';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orderDetails!:OrderPageableResponse;
  pageEvent!: PageEvent;
  userId!:number;
  date:string='';

  constructor(
    private orderService:OrderserviceService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {

    this.userId = this.loginService.getUserId();
    this.loadAllOrders();

  }

  loadAllOrders(){
    this.orderService.getOrderByBuyerId(this.userId).subscribe(
      (data:any)=>{
        console.log(data);
        this.orderDetails = data;
        console.log("order",this.orderDetails);
      
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  FilterByCode(input:string){
    if(input == ""){
      this.loadAllOrders();
    }else{
      this.orderService.getOrderByBuyerIdAndOrderCode(this.userId,input).subscribe(
        (data:any)=>{
          this.orderDetails = data;
          console.log("order",this.orderDetails);
        },
        (error)=>{
          console.log(error);
        }
      )
    }
  }

  onPaginateChange(event: PageEvent){
    let pageNumber = event.pageIndex; 
    let pageSize = event.pageSize;
    this.orderService.getOrderByBuyerId(this.userId,pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.orderDetails = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }


}
