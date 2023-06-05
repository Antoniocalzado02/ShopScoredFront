
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogiInComponent } from './logi-in/logi-in.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'login',
        component: LogiInComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LoginRouteModule { }