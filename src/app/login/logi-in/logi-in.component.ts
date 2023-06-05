import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { authService } from '../../auth/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-logi-in',
  templateUrl: './logi-in.component.html',
  styleUrls: ['./logi-in.component.css']
})
export class LogiInComponent implements OnInit {

  constructor(private authService: authService, private router:Router) { }

  @ViewChild('myForm') myForm!:NgForm;

  initForm = {
    name: "",
    password: ""
  }

  isLoggedIn!: boolean;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  notValid(campo: string): boolean{
    return this.myForm?.controls[campo]?.invalid &&
      !this.myForm?.controls[campo]?.pristine

  }

  signIn():void{
    console.log('name: ', this.myForm.value.name, 'Password: ', this.myForm.value.password)
    this.authService.login(this.myForm.value.name,this.myForm.value.password)
    .subscribe({
      next: (resp) => {
        if (resp) {
          this.isLoggedIn=true;
          Swal.fire({
            icon: 'success',
            title: 'Login correcto',
            timer: 1500
          })
          this.router.navigate(['/home'])
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario incorrecto'
          })
        }
      }
    })
    
  }
  
  logOut():void{
    this.authService.logout();
    this.isLoggedIn=false;
  }
}