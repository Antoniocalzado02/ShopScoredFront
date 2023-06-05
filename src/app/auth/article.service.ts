import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, of, catchError } from 'rxjs';
import { Articles } from "../interfaces/tabacos.interface";


@Injectable({
    providedIn: 'root'
  })

export class articlesService{

    url:string='http://localhost:9061/articulos'

    urls:string='http://localhost:9061/articulo'


    constructor(private http:HttpClient){}

    getProducts():Observable<any>{
        return this.http.get<any>(this.url)
    }

    getProductsById(id:number):Observable<any>{
        return this.http.get<any>(this.urls+"/"+id)
    }

    

    addProduct(name:string, description:string, price:number, stock:number, idCategory:number):Observable<boolean>{
     console.log(name, description, price, stock, idCategory);
     
      return this.http.post<any>(this.url, {
        "name": name,
        "description":description,
        "price": price,
        "stock": stock,
        "idCategory": idCategory
      })
      .pipe( switchMap(resp => {
        return of(true);
      }),catchError(error => {
          return of(false);
      })
      )
    }


    updateProduct(idProducto:number, name:string, description:string, price:number, stock:number):Observable<boolean>{
      return this.http.put<any>(this.url+'/'+idProducto, {
        "name": name,
        "description":description,
        "price": price,
        "stock": stock,
        
        })
        .pipe( switchMap(resp => {
          return of(true);
        }),catchError(error => {
            return of(false);
        })
        )
    }

    deleteArticulo(id:number):Observable<boolean>{
      return this.http.delete<any>(this.url+'/'+id)
      .pipe( switchMap(resp => {
        return of(true);
      }),catchError(error => {
          return of(false);
      })
      )
    }




}