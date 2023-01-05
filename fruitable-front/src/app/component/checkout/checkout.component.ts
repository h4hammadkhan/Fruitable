import { OrderserviceService } from './../../service/orderservice.service';
import { Router } from '@angular/router';
import { CartItem } from './../../model/cartItem';
import { CartService } from './../../service/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersOrder } from 'src/app/model/UsersOrder';
import { SignupService } from 'src/app/service/signup.service';
import { LoginService } from 'src/app/service/login.service';
import { User } from 'src/app/model/user';
import { Products } from 'src/app/model/products';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItem:CartItem[] = [];
  user!:User;
  product!:Products;
  userOrderForm!: FormGroup;
  userOrderedData:UsersOrder[]= new Array();
  totalPrice:number = 0;
  totalQuantity:number = 0;


  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private orderService: OrderserviceService,
    private loginService: LoginService,

  ) { }

  ngOnInit(): void {
    
    this.cartItem = this.cartService.getCartFromLocalStorage();
    this.totalPrice =  JSON.parse(localStorage.getItem('totalPrice')!)
    this.totalQuantity = JSON.parse(localStorage.getItem('totalQuantity')!)
  

    this.userOrderForm = this.formBuilder.group({
      productQuantity:['',Validators.required],
      subTotal:['',Validators.required],
      sellerUserName:['',Validators.required],
      deliveryAddress:['',Validators.required],
      city:['',Validators.required],
      buyerFirstName:['',Validators.required],
      buyerLastName:['',Validators.required],
      buyerPhone:['',Validators.required],
      buyerEmail:['',[Validators.required,Validators.email]],
      buyerUserName:['',Validators.required],
      product: this.formBuilder.group({
        productId:["",Validators.required]
      }),
      user: this.formBuilder.group({
        userId:["",Validators.required]
      })
    })

    this.loadCurrentUser();
    this.setOrderDetails();
  }

  setOrderDetails(){
    
  }

  

  loadCurrentUser(){
    this.loginService.getCurrentUser().subscribe(
      (user:any)=>{
        this.userOrderForm.patchValue({
          buyerFirstName: user.first_name,
          buyerLastName: user.last_name,
          buyerPhone: user.phone,
          buyerEmail: user.email,
          buyerUserName: user.userName,
          user:user,
        })
       this.user = user;
       this.product = user.product;
       console.log(user);
       
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  submit(){

    this.cartItem.forEach((item)=>{
      this.userOrderForm.patchValue({
        productQuantity:item.quantity,
        subTotal:item.quantity*item.price,
        sellerUserName:item.sellerUserName,
        buyerFirstName: this.user.first_name,
        buyerLastName: this.user.last_name,
        buyerPhone: this.user.phone,
        buyerEmail: this.user.email,
        buyerUserName: this.user.userName,
        product: {
          productId: item.productId,
        },
        user:this.user,
      })
      console.log(this.userOrderForm.value);
      // Object.assign(this.userOrderedData,this.userOrderForm.value);  
      this.userOrderedData.push(this.userOrderForm.value);
    })
    console.log("UserOrders:",this.userOrderedData);
    
    

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   cancelButtonText: 'cancel',
    //   cancelButtonColor: '#f44336',
    //   confirmButtonText: 'Yes',
    //   confirmButtonColor: '#3f51b5',
    //   confirmButtonAriaLabel: "hk",
    // }).then(
    //   (yes)=>{
    //     if(yes.isConfirmed){
    //       const date = new Date();
    //       const date_time = date.toDateString();

    //       // this.userOrderedData = this.userOrderForm.value;
    //       // this.userOrderedData.cartItem = this.cartService.getCartFromLocalStorage();
    //       // this.userOrderedData.dateTime = date_time;
    //       // this.userOrderedData.subTotal = JSON.parse(localStorage.getItem('totalPrice')!);
    //       // this.userOrderedData.totalQty = JSON.parse(localStorage.getItem('totalQuantity')!);

    //       // console.log("Price:",this.cartService.getPriceFormLocalStorage);
    //       // console.log("Qty:",this.cartService.getQuantityFormLocalStorage);

    //       // console.log(this.userOrderedData);


    //       // this.orderService.placeOrder(this.userOrderedData);
    //       Swal.fire("Success","Done Successfully","success")
    //       this.router.navigate(['/dashboard/order']);
    //     }
    //   }
    // )



  }

  get fields(){
    return this.userOrderForm.controls;
  }


}
