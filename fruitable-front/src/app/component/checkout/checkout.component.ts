import { OrderserviceService } from './../../service/orderservice.service';
import { Router } from '@angular/router';
import { CartItem } from './../../model/cartItem';
import { CartService } from './../../service/cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UsersOrder } from 'src/app/model/UsersOrder';
import { LoginService } from 'src/app/service/login.service';
import { User } from 'src/app/model/user';
import { ProductserviceService } from 'src/app/service/productservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItem:CartItem[] = [];
  user!:User;
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
    private productService: ProductserviceService,

  ) { }

  ngOnInit(): void {
    
    this.cartItem = this.cartService.getCartFromLocalStorage();
    this.totalPrice =  JSON.parse(localStorage.getItem('totalPrice')!)
    this.totalQuantity = JSON.parse(localStorage.getItem('totalQuantity')!)
  

    this.userOrderForm = this.formBuilder.group({
      productQuantity:[''],
      subTotal:[''],
      sellerUserName:[''],
      orderCode:[''],
      deliveryAddress:['',Validators.required],
      city:['',Validators.required],
      buyerFirstName:['',Validators.required],
      buyerLastName:['',Validators.required],
      buyerPhone:['',Validators.required],
      buyerEmail:['',[Validators.required,Validators.email]],
      buyerUserName:[''],
      product: this.formBuilder.group({
        productId:[""]
      }),
      user: this.formBuilder.group({
        userId:[""]
      })
    })

    this.loadCurrentUser();
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
       console.log(user);
       
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  submit(){
    var randomCode = Math.floor(Math.random()*999999);
    
    this.cartItem.forEach(item => {
      this.userOrderForm.patchValue({
        productQuantity:item.quantity,
        subTotal:item.quantity*item.price,
        sellerUserName:item.sellerUserName,
        buyerUserName: this.user.userName,
        orderCode: 'FUO'+randomCode,
        product: {
          productId: item.productId,
        },
        user:this.user,
      })
      console.log(this.userOrderForm.value);
      this.userOrderedData.push(this.userOrderForm.value);
    });
    console.log("UserOrders:",this.userOrderedData);
    
    

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'cancel',
      cancelButtonColor: '#f44336',
      confirmButtonText: 'Yes',
      confirmButtonColor: '#7fb602',
      confirmButtonAriaLabel: "hk",
    }).then(
      (yes)=>{
        if(yes.isConfirmed){

          this.orderService.placeOrder(this.userOrderedData).subscribe(
            (data)=>{
              console.log(data);
              this.productService.updateProductQty(this.userOrderedData).subscribe(
                (data:any)=>{
                  console.log(data);
                },
                (error)=>{
                  console.log(error);
                }
              )
              this.cartService.deleteFromLocalStorage();
              Swal.fire("Success","Done Successfully","success")
              this.router.navigate(['/buyer-dashboard/order']);
            },
            (error)=>{
              console.log(error);
            }
          );
        }
      }
    )



  }

  get fields(){
    return this.userOrderForm.controls;
  }


}
