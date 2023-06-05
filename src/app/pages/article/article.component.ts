import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { articlesService } from 'src/app/auth/article.service';
import { Content } from 'src/app/interfaces/tabacos.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  constructor(private articleService:articlesService, private activateRouter:ActivatedRoute) { }

  lista:Content[]=[]

idCategory!: number;

  ngOnInit(): void {

    this.idCategory=this.activateRouter.snapshot.params['id']

if(this.idCategory){
  this.articleService.getProductsById(this.idCategory)
  .subscribe({
    next: (resp)=>{
      this.lista=resp.content
    },
    error: (error)=>{
      console.log(error)
    }
  })
}else{
  
  this.articleService.getProducts()
  .subscribe({
    next: (resp)=>{
      this.lista=resp.content
    },
    error: (error)=>{
      console.log(error)
    }
  })
}
  }

  deleteArticulo( id:number){
    Swal.fire({
      title: '¿Seguro que desea borrar el tabaco con '+id+'?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticulo(id)
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

  comprar(){
    Swal.fire(
      'Comprado!',
      'Tu compra se ha realizado con exito.',
      'success'
    )
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
