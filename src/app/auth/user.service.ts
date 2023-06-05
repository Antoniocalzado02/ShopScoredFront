import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable, switchMap, catchError, BehaviorSubject } from 'rxjs';
import { AuthResponse } from '../interfaces/token.interface';
import { Token } from '@angular/compiler';
import jwt_decode from "jwt-decode";
import { DecodeToken } from '../interfaces/decode-token.interface';

@Injectable({
    providedIn: 'root'
  })

  export class userService{

    url:string = 'http://localhost:9061/userGet'
    urls:string='http://localhost:9061/updateImage'
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        Authorization: 'Bearer' + localStorage.getItem('token')
    };

    private loged = new BehaviorSubject<boolean> (false);

    private admin = new BehaviorSubject<boolean> (false);

    constructor(private http: HttpClient){}


    

    getUser(username:string | null):Observable<any>{
        return this.http.get<any>(this.url+"/"+username)
      }

    updateImage(username:string,image:string){
      return this.http.post<any>(this.urls+"/"+username, this.httpOptions)
      .pipe(switchMap(resp=>{
        return of (true)
      }),catchError(error=>{
        return of (false)
      })
      )
    }

   


    
    
}