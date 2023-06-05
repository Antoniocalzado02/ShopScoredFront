import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { RouterModule } from '@angular/router';
import { sharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    RouterModule

  ],exports:[
    NavbarComponent,
    FooterComponent,
    BodyComponent,
    sharedRoutingModule
    
  ]
})
export class SharedModule { }
