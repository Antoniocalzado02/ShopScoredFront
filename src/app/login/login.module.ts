import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogiInComponent } from './logi-in/logi-in.component';
import { RegisterComponent } from './register/register.component';
import { LoginRouteModule } from './login-routes.module';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    LogiInComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],exports:[
    LoginRouteModule
  ]
})
export class LoginModule { }
