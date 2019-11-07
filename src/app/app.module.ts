import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'angular5-data-table';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from '../environments/environment';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './shared/services/auth-gard.service';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SharedModule } from 'shared/shared.module';



const appRoutes: Routes = [{ path: '', component: ProductsComponent },
{ path: 'products', component: ProductsComponent },
{ path: 'shopping-cart', component: ShoppingCartComponent },
{ path: 'login', component: LoginComponent },

{
  path: 'check-out',
  component: CheckOutComponent,
  canActivate: [AuthGuard]
},
{
  path: 'order-success/:id',
  component: OrderSuccessComponent,
  canActivate: [AuthGuard]
},
{
  path: 'my/orders',
  component: MyOrdersComponent,
  canActivate: [AuthGuard]
},
{
  path: 'admin/products/new',
  component: ProductFormComponent,
  canActivate: [AuthGuard, AdminAuthGuard]
},
{
  path: 'admin/products/:id',
  component: ProductFormComponent,
  canActivate: [AuthGuard, AdminAuthGuard]
},
{
  path: 'admin/products',
  component: AdminProductsComponent,
  canActivate: [AuthGuard, AdminAuthGuard]
},
{
  path: 'admin/orders',
  component: AdminOrdersComponent,
  canActivate: [AuthGuard, AdminAuthGuard]
}]

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,

    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    DataTableModule.forRoot()



  ],
  providers: [
    AdminAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
