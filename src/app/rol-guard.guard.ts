import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router"
import { authService } from "./auth/auth.service"
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import Swal from "sweetalert2";


@Injectable()
export class RolGuard implements CanActivate, CanActivateChild {
  
  constructor(private router: Router, private authService:authService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.authService.isAdminGuard()){
      return true
    }
    else{
      this.router.navigateByUrl('account/login')
      Swal.fire({
        icon: 'error',
        title: 'No tiene permiso',
        text: 'No tiene permiso para acceder a esa ruta'
      })
      return false
    }
    
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.isAdmin
  }

}