import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { articlesService } from 'src/app/auth/article.service';
import Swal from 'sweetalert2';
import { Content } from '../../interfaces/category.interface';

@Component({
  selector: 'app-add-articulo',
  templateUrl: './add-articulo.component.html',
  styleUrls: ['./add-articulo.component.css']
})
export class AddArticuloComponent {
  constructor(private fb: FormBuilder, private articleService:articlesService, private route:Router) { }
 

  lista:Content[]=[]

 

  
  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [null, [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.min(1)]],
    stock: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    idCategory: ['', [Validators.required, Validators.min(1), Validators.max(10)]]
  })

  isValidField(field: string){
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }


  addArticulo(){
    console.log("entra")
    if (this.myForm.invalid){ //Para que no se pueda mandar el formulario sin tocar los campos
      this.myForm.markAllAsTouched() 
    }
    else{
      this.articleService.addProduct(this.myForm.value.name, this.myForm.value.description,this.myForm.value.price,this.myForm.value.stock,this.myForm.value.idCategory)
      .subscribe({
        next:(resp)=>{
          if(resp){
            Swal.fire({
              icon: 'success',
              title: 'Categoria añadida correctamente',
              text: 'Nombre: '+this.myForm.value.name+', descripcion: '+this.myForm.value.description
            })
            this.route.navigate(["/pages/tabacos"])
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
