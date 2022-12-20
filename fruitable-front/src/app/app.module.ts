import { NotfoundComponent } from './component/notfound/notfound.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsingleComponent } from './component/productsingle/productsingle.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { OrdersComponent } from './component/orders/orders.component';
import { LoginComponent } from './component/login/login.component';
import { SignupBuyerComponent } from './component/signup-buyer/signup-buyer.component';
import { SignupSellerComponent } from './component/signup-seller/signup-seller.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { CartEmptyComponent } from './component/cart-empty/cart-empty.component';
import { DashboardsidebarComponent } from './component/dashboardsidebar/dashboardsidebar.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CategoryTagComponent } from './component/category-tag/category-tag.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsingleComponent,
    CartComponent,
    CheckoutComponent,
    DashboardComponent,
    OrdersComponent,
    LoginComponent,
    SignupBuyerComponent,
    SignupSellerComponent,
    SidebarComponent,
    LoginComponent,
    CartEmptyComponent,
    DashboardsidebarComponent,
    AddProductComponent,
    CategoryTagComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    InfiniteScrollModule,
    NgxPageScrollCoreModule,
    MatMenuModule,
    MatStepperModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
