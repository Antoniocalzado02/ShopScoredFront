import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { articlesService } from 'src/app/auth/article.service';
import { categoryService } from 'src/app/auth/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-articulo',
  templateUrl: './edit-articulo.component.html',
  styleUrls: ['./edit-articulo.component.css']
})
export class EditArticuloComponent {
  constructor(private fb: FormBuilder, private categoriaService: categoryService,
    private route: Router, private articleService: articlesService, private aRoute: ActivatedRoute) { }

  idProducto!: number

  listaCategorias: any[] = []

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: [null, [Validators.required, Validators.minLength(10)]],
    price: ['', [Validators.required, Validators.min(0), Validators.max(999)]],
    stock: ['', [Validators.required, Validators.min(0)]],

  })

  ngOnInit(): void {
    this.idProducto = this.aRoute.snapshot.params['id']

    this.articleService.getProductsById(this.idProducto)
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.myForm.reset({
              nombre: resp.nombre,
              descripcion: resp.descripcion,
              price: resp.price,
              stock: resp.stock,
            })
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo ha ido mal'
            }).then((resp) => {
              this.route.navigateByUrl('/products/all')
            })
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo ha ido mal'
          }).then((resp) => {
            this.route.navigateByUrl('/products/all')
          })
        }
      })
  }

  isValidField(field: string) {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched
  }

  updateProduct() {
    this.articleService.updateProduct(this.idProducto, this.myForm.value.name, this.myForm.value.description, this.myForm.value.price, this.myForm.value.stock)
      .subscribe({
        next: (resp) => {
          if (resp) {
            Swal.fire({
              icon: 'success',
              title: 'Producto actualizado correctamente',
              text: 'Nombre: ' + this.myForm.value.name + ', descripcion: ' + this.myForm.value.description
            })
            this.route.navigate(["/home"])
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se pudo actualizar el producto'
            })
          }
        }
      })
  }

}
