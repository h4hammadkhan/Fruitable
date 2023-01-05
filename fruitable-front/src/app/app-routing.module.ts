import { NotfoundComponent } from './component/notfound/notfound.component';
import { OrdersComponent } from './component/orders/orders.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { LoginguardGuard } from './guard/loginguard.guard';
import { AddProductComponent } from './seller/add-product/add-product.component';
import { DashboardComponent } from './buyer/dashboard/dashboard.component';
import { ProductsingleComponent } from './component/productsingle/productsingle.component';
import { LoginComponent } from './component/login/login.component';
import { CartComponent } from './component/cart/cart.component';
import { HomeComponent } from './component/home/home.component';
import { SignupBuyerComponent } from './component/signup-buyer/signup-buyer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupSellerComponent } from './component/signup-seller/signup-seller.component';
import { BuyerGuard } from './guard/buyer.guard';
import { SellerDashboardComponent } from './seller/seller-dashboard/seller-dashboard.component';
import { SellerGuard } from './guard/seller.guard';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './guard/admin.guard';
import { UsersListComponent } from './admin/usersList/usersList.component';
import { SellerOrdersComponent } from './seller/seller-orders/seller-orders.component';
import { SellerProfileComponent } from './seller/seller-profile/seller-profile.component';
import { SellerProdustListComponent } from './seller/seller-produstList/seller-produstList.component';
import { SellerShipComponent } from './seller/seller-ship/seller-ship.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component';
import { ProfileComponent } from './buyer/profile/profile.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { SellerUpdateProfileComponent } from './seller/seller-update-profile/seller-update-profile.component';

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
    canActivate: [LoginguardGuard],
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
    canActivate: [BuyerGuard],

  },
  {
    path: "buyer-dashboard",
    component: DashboardComponent,
    canActivate: [BuyerGuard],
    children:[
      
      {
        path: "order",
        component: OrdersComponent,
      },
      {
        path: "profile",
        component: ProfileComponent,
      }
    ]
  },
  {
    path: "seller-dashboard",
    component: SellerDashboardComponent,
    canActivate: [SellerGuard],
    children:[
     
      {
        path: "add-product",
        component: AddProductComponent,
      },
      {
        path: "update-product/:id",
        component: UpdateProductComponent
      },
      {
        path: "orders",
        component: SellerOrdersComponent,
      },
      {
        path: "update-profile",
        component: SellerUpdateProfileComponent,
      },
      {
        path: "profile",
        component: SellerProfileComponent
      },
      {
        path: "product-list",
        component: SellerProdustListComponent
      },
      {
        path: "ship",
        component: SellerShipComponent
      },
    ]
  },
  {
    path: "admin-dashboard",
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path: "users-list",
        component: UsersListComponent,
      },
      {
        path: "profile",
        component: AdminProfileComponent,
      }
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
