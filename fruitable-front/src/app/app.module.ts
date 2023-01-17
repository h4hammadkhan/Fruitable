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
import { DashboardComponent } from './buyer/dashboard/dashboard.component';
import { OrdersComponent } from './buyer/orders/orders.component';
import { LoginComponent } from './component/login/login.component';
import { SignupBuyerComponent } from './component/signup-buyer/signup-buyer.component';
import { ProfileComponent } from './buyer/profile/profile.component'
import { UpdateProfileComponent } from './buyer/update-profile/update-profile.component';

import { SignupSellerComponent } from './component/signup-seller/signup-seller.component';
import { SellerDashboardComponent} from './seller/seller-dashboard/seller-dashboard.component';
import { SellerDashboardsidebarComponent} from './seller/seller-dashboardsidebar/seller-dashboardsidebar.component';
import { SellerOrdersComponent} from './seller/seller-orders/seller-orders.component';
import { SellerProdustListComponent} from './seller/seller-produstList/seller-produstList.component';
import { SellerProfileComponent } from './seller/seller-profile/seller-profile.component';
import { SellerShipComponent } from './seller/seller-ship/seller-ship.component';
import { AddProductComponent } from './seller/add-product/add-product.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component';
import { SellerUpdateProfileComponent } from './seller/seller-update-profile/seller-update-profile.component';
import { SellerCompletedOrderComponent } from './seller/seller-completed-order/seller-completed-order.component';



import { AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import { AdminDashboardsidebarComponent} from './admin/admin-dashboardsidebar/admin-dashboardsidebar.component';
import {BuyersListComponent} from './admin/buyersList/buyersList.component'
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminUpdateProfileComponent } from './admin/admin-update-profile/admin-update-profile.component';
import { ReportComponent } from './admin/report/report.component'
import { SellersListComponent } from './admin/sellersList/sellersList.component';
import { ViewUserProfileComponent } from './admin/view-user-profile/view-user-profile.component';
import { ProductsListComponent } from './admin/productsList/productsList.component';
import { ViewUserProductComponent } from './admin/view-user-product/view-user-product.component';


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
import { DashboardsidebarComponent } from './buyer/dashboardsidebar/dashboardsidebar.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CategoryTagComponent } from './component/category-tag/category-tag.component';
import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthInterceptorProviders } from './service/auth.interceptor';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AboutSellerComponent } from './component/about-seller/about-seller.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import { ReportDialogComponent } from './component/report-dialog/report-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';



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
    CategoryTagComponent,
    NotfoundComponent,
    SellerDashboardComponent,
    SellerDashboardsidebarComponent,
    AdminDashboardComponent,
    AdminDashboardsidebarComponent,
    BuyersListComponent,
    AddProductComponent,
    SellerOrdersComponent,
    SellerProdustListComponent,
    SellerProfileComponent,
    SellerShipComponent,
    UpdateProductComponent,
    ProfileComponent,
    AdminProfileComponent,
    SellerUpdateProfileComponent,
    UpdateProfileComponent,
    SellerCompletedOrderComponent,
    AboutSellerComponent,
    ReportDialogComponent,
    AdminUpdateProfileComponent,
    ReportComponent,
    SellersListComponent,
    ViewUserProfileComponent,
    ProductsListComponent,
    ViewUserProductComponent,

  ],
  entryComponents: [
    ReportDialogComponent,
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
    MatProgressBarModule,
    MatSidenavModule,
    MatRippleModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    
  ],
  providers: [AuthInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
