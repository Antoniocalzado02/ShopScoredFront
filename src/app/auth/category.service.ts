import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, catchError, of } from 'rxjs';
import { Category, Content } from '../interfaces/category.interface';

@Injectable({
    providedIn: 'root'
  })

export class categoryService{

    url:string='http://localhost:9061/categories'

    constructor(private http:HttpClient){}

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    getCategorias(numero:number):Observable<any>{
      return this.http.get<any>(this.url+"?pageSize="+numero)
    }

    addCategoria(name:string, description:string):Observable<boolean>{
      return this.http.post<any>(this.url, {"name":name, "description":description}, this.httpOptions)
      .pipe( switchMap(resp => {
        return of(true);
      }),catchError(error => {
          return of(false);
      })
      )
    }


    deleteCategoria(id:number):Observable<boolean>{
      return this.http.delete<any>(this.url+'/'+id)
      .pipe( switchMap(resp => {
        return of(true);
      }),catchError(error => {
          return of(false);
      })
      )
    }
    
    editarCategoria(id:number, nombre:string, descripcion:string):Observable<boolean>{
      return this.http.put<any>(this.url+'/'+id,{"nombre":nombre, "descripcion":descripcion},this.httpOptions)
      .pipe(switchMap(resp=>{
        return of (true)
      }),catchError(error=>{
        return of (false)
      })
      )
    }

    getCategoriaById(id:number):Observable<Category>{
      return this.http.get<Category>(this.url+'/'+id)
    }


}