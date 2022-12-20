import { NotfoundComponent } from './component/notfound/notfound.component';
import { OrdersComponent } from './component/orders/orders.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { LoginguardGuard } from './guard/loginguard.guard';
import { AddProductComponent } from './component/add-product/add-product.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProductsingleComponent } from './component/productsingle/productsingle.component';
import { LoginComponent } from './component/login/login.component';
import { CartComponent } from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';
import { SignupBuyerComponent } from './component/signup-buyer/signup-buyer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupSellerComponent } from './component/signup-seller/signup-seller.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: "login",
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: "signup-buyer",
    component: SignupBuyerComponent,
    pathMatch: 'full'
  },
  {
    path: "signup-seller",
    component: SignupSellerComponent,
    pathMatch: 'full'
  },
  {
    path: "cart",
    component: CartComponent,
    pathMatch: 'full',

  },
  {
    path: "product-single/:pid",
    component: ProductsingleComponent,
    pathMatch: 'full',
  },
  {
    path: "category/:cate",
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [LoginguardGuard],
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [LoginguardGuard],
    children:[
      {
        path: "addProduct",
        component: AddProductComponent,
      },
      {
        path: "order",
        component: OrdersComponent,
      },
    ]
  },

  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: '**',
    component: NotfoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
