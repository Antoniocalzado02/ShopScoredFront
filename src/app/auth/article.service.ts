import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, of, catchError } from 'rxjs';
import { Articles } from "../interfaces/articles.interface";


@Injectable({
    providedIn: 'root'
  })

export class articlesService{

    url:string='https://shopscoredapi-production.up.railway.app/articulos'

    urls:string='https://shopscoredapi-production.up.railway.app/articulo'

    httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/json' })     };

    constructor(private http:HttpClient){

    }

    getProducts():Observable<any>{
        return this.http.get<any>(this.url)
    }

    getProductsById(id:number):Observable<any>{
        return this.http.get<any>(this.urls+"/"+id)
    }

    getProductsByIds(id:number):Observable<any>{
      return this.http.get<any>(this.url+"/"+id)
  }

    

    addProduct(name:string, description:string, price:number, stock:number, idCategory:number):Observable<boolean>{
     console.log(name, description, price, stock, idCategory);
     
      return this.http.post<any>(this.urls+"/"+idCategory, {
        "name": name,
        "description":description,
        "price": price,
        "stock": stock

      }, this.httpOptions)
      .pipe( switchMap(resp => {
        return of(true);
      }),catchError(error => {
          return of(false);
      })
      )
    }




    updateProduct( name:string, description:string, price:number, stock:number,idProducto:number):Observable<boolean>{
      return this.http.put<any>(this.urls+'/'+idProducto, {
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