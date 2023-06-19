import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/auth/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent {
  id: number = 0

  loading:boolean=false

  constructor(private fb: FormBuilder, private categoriaService: categoryService, private route: Router, private activatedRoute: ActivatedRoute) { }

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    description: [null, [Validators.required, Validators.minLength(10)]]
  })

  getCategoriaById(){
    this.loading=true
    this.categoriaService.getCategoriaByIds(this.activatedRoute.snapshot.params['id'])
    .subscribe({
      next: (resp) => {
        if (resp) {
          this.myForm.reset({
            nombre: resp.name,
            descripcion: resp.description
          })
          this.loading=false
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha ido mal'
          }).then((resp) => {
            this.loading=false
            this.route.navigateByUrl('/categoria')
          })
        }
      }, error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo ha ido mal'
        }).then((resp) => {
          this.loading=false
          this.route.navigateByUrl('/categoria')
        })
      }
    })
  }

  editarCategoria() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched
    }
    else {
      this.loading=true
      this.categoriaService.editarCategoria(this.activatedRoute.snapshot.params['id'], this.myForm.value.nombre, this.myForm.value.descripcion)
        .subscribe({
          next: (resp) => {
            Swal.fire({
              icon: 'success',
              title: 'Categoria actualizada correctamente',
              text: 'Nombre: ' + this.myForm.value.name + ', descripcion: ' + this.myForm.value.description
            })
            this.loading=false
            this.route.navigate(["/pages/category"])
          },
          error: (error) => {
            Swal.fire(
              'Oops!',
              'Ocurrió un error inesperado.',
              'error'
            )
            this.loading=false
          }
        })
    }
  }
}
