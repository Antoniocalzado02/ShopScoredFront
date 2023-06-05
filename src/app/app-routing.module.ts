import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundError } from 'rxjs';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m=>m.HomeModule) 
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m=>m.PagesModule)
  },
  {
    path: 'shared',
    loadChildren: ()=> import('./shared/shared.module').then(m=>m.SharedModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundError
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
