import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UpdateProductComponent } from './update-product/update-product.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent },
  { path: 'update-product', component: UpdateProductComponent },

  // { path: 'cart', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })], // only for debugging purposes
  // imports: [RouterModule.forRoot([
  //   // { path: '', component: ProductListComponent },
  //   { path: 'products/:productId', component: ProductDetailsComponent },
  //   { path: 'cart', component: CartComponent },
  // ])],
  exports: [RouterModule],
  
})
export class AppRoutingModule { }