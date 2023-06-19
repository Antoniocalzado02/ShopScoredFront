import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from 'src/app/auth/user.service';
import { User } from 'src/app/interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent {

  user!:User;
  username!:string

  selectedImage!: File;

  myForm: FormGroup = this.fb.group({
    image: File
  })
  constructor(private fb: FormBuilder, private userService: userService,
    private route: Router, private aRoute: ActivatedRoute) { }

    ngOnInit(): void{
      this.username=this.aRoute.snapshot.params["username"]
    }



  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
  }

    getUser(username:string){
      this.userService.getUser(username)
      .subscribe({
        next:(resp)=>{
          this.user=resp.User
        }
      })
    }

    updateImage(){
      this.userService.updateImage(this.username,this.myForm.value.image)
      .subscribe({
        next: (resp)=>{
          if(resp){
            
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo añadir la categoria'
            })
            this.route.navigate(["/home"])
          }
          else{
            console.log(resp)
            Swal.fire({
              icon: 'success',
              title: 'Categoria añadida correctamente',
              text: 'Imagen añadida correctamente'
            })
          }
    
        }
      })
    }

    isValidField(field: string){
      return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
    }

    
}
