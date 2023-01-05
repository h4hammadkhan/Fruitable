import { OrderserviceService } from './../../service/orderservice.service';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  // orderDetails:UserOrder[]=[];
  // filterByDate:UserOrder[]=[];
  date:string='';

  constructor(
    private orderService:OrderserviceService,
  ) { }

  ngOnInit(): void {

    this.getAllOdreDetails();


  }

  getAllOdreDetails(){
    // this.orderDetails = this.orderService.getOderDetails();
    // this.filterByDate = [];
    this.date = '';
  }

  getDate(event: MatDatepickerInputEvent<Date>){
    this.date = event.value?.toDateString()!;
    // let orders = this.orderDetails.filter(temp => temp.dateTime == this.date);

    // this.filterByDate.splice(0,this.filterByDate.length);
    // this.filterByDate.push(...orders);

  }


}
