
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
    {
        path: 'body',
        component: BodyComponent,
        pathMatch: 'full'
    },
    {
        path: 'footer',
        component: FooterComponent,
        pathMatch: 'full'
    },
    {
        path: 'navbar',
        component: NavbarComponent,
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class sharedRoutingModule { }