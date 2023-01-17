import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShipPageableResponse } from 'src/app/model/ShipPageableResponse';
import { LoginService } from 'src/app/service/login.service';
import { OrderserviceService } from 'src/app/service/orderservice.service';

@Component({
  selector: 'app-seller-completed-order',
  templateUrl: './seller-completed-order.component.html',
  styleUrls: ['./seller-completed-order.component.css']
})
export class SellerCompletedOrderComponent implements OnInit {
  orderDetails!:ShipPageableResponse;
  pageEvent!: PageEvent;
  userName!:string;

  constructor(
    private orderService:OrderserviceService,
    private loginService: LoginService,
    private matSnack: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.userName = this.loginService.getUserName();
    this.loadAllOrders();

  }

  loadAllOrders(){
    this.orderService.getCompletedOrders(this.userName).subscribe(
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
      this.orderService.getCompletedOrdersByCode(input).subscribe(
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
    this.orderService.getCompletedOrders(this.userName,pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.orderDetails = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }


}
