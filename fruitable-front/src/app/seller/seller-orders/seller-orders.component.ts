import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderPageableResponse } from 'src/app/model/OrderPageableResponse';
import { Ship } from 'src/app/model/ship';
import { LoginService } from 'src/app/service/login.service';
import { OrderserviceService } from 'src/app/service/orderservice.service';

@Component({
  selector: 'app-seller-orders',
  templateUrl: './seller-orders.component.html',
  styleUrls: ['./seller-orders.component.css']
})
export class SellerOrdersComponent implements OnInit {

  orderDetails!:OrderPageableResponse;
  pageEvent!: PageEvent;
  addToShipForm!:FormGroup;
  userName!:string;
  date:string='';

  constructor(
    private orderService:OrderserviceService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private matSnack: MatSnackBar,
  ) { }

  ngOnInit(): void {

    this.userName = this.loginService.getUserName();
    this.loadAllOrders();

  }

  loadAllOrders(){
    this.orderService.getOrdersBySellerUserNameAndActive(this.userName).subscribe(
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

  confirmToShip(usersOrderId:number,orderCode:string){
    this.addToShipForm = this.formBuilder.group({
      code:orderCode,
      sellerUserName:this.userName,
      usersOrder:{
        usersOrderId: usersOrderId
      }
    });
    console.log(this.addToShipForm.value);
    this.orderService.addToShip(this.addToShipForm.value).subscribe(
      (data:any)=>{
        this.matSnack.open("successfully added",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-success"
        })
        this.loadAllOrders();
      },
      (error)=>{
        this.matSnack.open("Something went wong!!",'',{
          duration: 3000,
          verticalPosition: "top",
          horizontalPosition: "right",
          panelClass: "snack-dander"
        })
      }
    )

    
  }

  FilterByCode(input:string){
    if(input == ""){
      this.loadAllOrders();
    }else{
      this.orderService.getOrdersByOrderCodeAndActive(input).subscribe(
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
    this.orderService.getOrdersBySellerUserNameAndActive(this.userName,pageNumber,pageSize).subscribe(
      (data:any)=>{
        this.orderDetails = data;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
