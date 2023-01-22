import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShipPageableResponse } from 'src/app/model/ShipPageableResponse';
import { LoginService } from 'src/app/service/login.service';
import { OrderserviceService } from 'src/app/service/orderservice.service';

@Component({
  selector: 'app-seller-ship',
  templateUrl: './seller-ship.component.html',
  styleUrls: ['./seller-ship.component.css']
})
export class SellerShipComponent implements OnInit {

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
    this.loadAllShippingOrders();

  }

  loadAllShippingOrders(){
    this.orderService.getAllShipBySeller(this.userName).subscribe(
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
      this.loadAllShippingOrders();
    }else{
      this.orderService.getOrdersByCodeAndActiveTrue(input).subscribe(
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
    this.orderService.getAllShipBySeller(this.userName,pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.orderDetails = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }


  orderComplete(shipId:number){
    this.orderService.completeOrder(shipId).subscribe(
      (data:any)=>{
        console.log(data);
        this.matSnack.open("Order Completed",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-success"
        });
        this.loadAllShippingOrders();
      },
      (error)=>{
        console.log(error);
        this.matSnack.open("Something went wrong!!",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-dander"
        })
      }
    )
  }

}
