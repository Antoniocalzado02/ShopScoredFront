import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validator} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { categoryService } from 'src/app/auth/category.service';
import { authService } from '../../auth/auth.service';
import { Pageable, Content, Category } from '../../interfaces/category.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private authService:authService, private form: FormBuilder, private route: Router, private categoryService: categoryService) { }

  nombreCategoria:string=""

  lista:Content[]=[]


  dtOptions: DataTables.Settings = {};
  posts: any;

  dtTrigger: Subject<any>=new Subject<any>();

 
 
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.categoryService.getCategorias(999)
    .subscribe({
      next: (resp)=>{
        this.lista=resp.content
        this.dtTrigger.next(this.lista)
      },
      error: (error)=>{
        console.log(error)
      }
    })

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  verProductos(idCategoria:number){
    this.route.navigateByUrl("/tabaco?id="+idCategoria)
  }


  deleteCategoria(nombre:string, id:number){
    Swal.fire({
      title: '¿Seguro que desea borrar la categoria '+nombre+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategoria(id)
        .subscribe({
          next: (resp)=>{
            Swal.fire(
              'Borrado!',
              'La categoría ha sido borrada.',
              'success'
            ).then((resp)=>{
              window.location.reload()
            })
          },
          error: (error)=>{
            Swal.fire(
              'Oops!',
              'Ocurrió un error inesperado.',
              'error'
            )
          }
        })
        
      }
    })
  }

}
