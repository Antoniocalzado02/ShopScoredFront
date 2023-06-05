import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { userService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private activeRouter:Router, private userService:userService) { }

  username!: string | null;
 
  ngOnInit(): void {

    this.username=localStorage.getItem("username");
  }
  

  logout(){
      localStorage.removeItem('token'); 
      this.activeRouter.navigate(['/home'])
  }

  isLoggedIn(){
    if(localStorage.getItem('token')){
        return true
    }
    else{
        return false
    }
}





}
