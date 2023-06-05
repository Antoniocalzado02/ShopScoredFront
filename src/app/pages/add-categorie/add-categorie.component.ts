import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { categoryService } from 'src/app/auth/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.css']
})
export class AddCategorieComponent {

  constructor(private fb: FormBuilder, private categoriaService:categoryService, private route:Router) { }

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [null, [Validators.required, Validators.minLength(10)]]
  })

  isValidField(field: string){
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }


  addCategoria(){
    if (this.myForm.invalid){ //Para que no se pueda mandar el formulario sin tocar los campos
      this.myForm.markAllAsTouched() 
    }
    else{
      this.categoriaService.addCategoria(this.myForm.value.name, this.myForm.value.description)
      .subscribe({
        next:(resp)=>{
          if(resp){
            Swal.fire({
              icon: 'success',
              title: 'Categoria añadida correctamente',
              text: 'Nombre: '+this.myForm.value.name+', descripcion: '+this.myForm.value.description
            })
            this.route.navigate(["/pages/category"])
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo añadir la categoria'
            })
          }
        }
      })
    }
    
  }
}
