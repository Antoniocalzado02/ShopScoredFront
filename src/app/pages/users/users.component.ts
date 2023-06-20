import { Component } from '@angular/core';
import { userService } from 'src/app/auth/user.service';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  user!: User
  name = localStorage.getItem('token');

  constructor(private usuarioService: userService) { }

  ngOnInit(): void {
    this.getUsuarios()

  }

  getUsuarios() {
    
    this.usuarioService.getUser(this.name)
      .subscribe({
        next: (resp) => {
          this.user = resp
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha ido mal'
          })
         
        }
      })
  }
}
