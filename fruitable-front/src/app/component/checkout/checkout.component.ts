
import { OrderserviceService } from './../../service/orderservice.service';
import { Router } from '@angular/router';
import { CartItem } from './../../model/cartItem';
import { CartService } from './../../service/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserOrder } from 'src/app/model/userOrder';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  userOrderForm!: FormGroup;
  userOrderedData!:UserOrder;


  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderserviceService,

  ) { }

  ngOnInit(): void {

    this.userOrderForm = this.formBuilder.group({
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phone:['',Validators.required],
      deliveryAddress:['',Validators.required],
    })

  }

  submit(){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'cancel',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#3f51b5',
      confirmButtonAriaLabel: "hk",
    }).then(
      (yes)=>{
        if(yes.isConfirmed){
          const date = new Date();
          const date_time = date.toDateString();

          this.userOrderedData = this.userOrderForm.value;
          this.userOrderedData.cartItem = this.cartService.getCartFromLocalStorage();
          this.userOrderedData.dateTime = date_time;
          this.userOrderedData.subTotal = JSON.parse(localStorage.getItem('totalPrice')!);
          this.userOrderedData.totalQty = JSON.parse(localStorage.getItem('totalQuantity')!);

          // console.log("Price:",this.cartService.getPriceFormLocalStorage);
          // console.log("Qty:",this.cartService.getQuantityFormLocalStorage);

          // console.log(this.userOrderedData);


          this.orderService.placeOrder(this.userOrderedData);
          Swal.fire("Success","Done Successfully","success")
          this.router.navigate(['/dashboard/order']);
        }
      }
    )



  }

  get fields(){
    return this.userOrderForm.controls;
  }


}
