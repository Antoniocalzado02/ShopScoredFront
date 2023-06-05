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

  export class authService{

    url:string = 'http://localhost:9061'
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        Authorization: 'Bearer' + localStorage.getItem('token')
    };

    private loged = new BehaviorSubject<boolean> (false);

    private admin = new BehaviorSubject<boolean> (false);

    constructor(private http: HttpClient){}

    register(username: string, pass:string, name:string, email:string):Observable<boolean>{
        return this.http.post<any>(this.url+"/signup", {"username":username, "pass":pass, "name":name, "email":email},this.httpOptions)
        .pipe( switchMap(resp => {
                return of(true);
            }),catchError(error => {
                return of(false);
            })
        )
    }

    get isAdmin() {
        return this.admin.asObservable();
      }

    get isLoged(){
        return this.loged.asObservable();
    }

    verify(code: string, username: string):Observable<boolean>{
        return this.http.get<any>('http://localhost:8082/verify?code='+code+'&username='+username, this.httpOptions)
        .pipe( switchMap(resp => {
                return of(true);
            }),catchError(error => {
                return of(false);
            })
        )
    }

    
    login(name: string, password: string):Observable<boolean>{
        return this.http.post<AuthResponse>(this.url+"/signin", {name, password},this.httpOptions)
        .pipe( switchMap(token => {
                localStorage.setItem('token', token.token);
                localStorage.setItem('username',name)
                return of(true);
            }),catchError(error => {
                localStorage.removeItem('token');
                return of(false);
            })
        )
    }

    logout() {
        localStorage.setItem('authenticated', 'false');
        localStorage.removeItem('rol'); 
    }

    isAuthenticated() {
        return localStorage.getItem('authenticated')==='true'
    }


    getCategories():Observable<boolean>{
        return this.http.get<any>(this.url+"/categories", this.httpOptions)
        .pipe( switchMap(resp => {
                return of(true);
            }),catchError(error => {
                return of(false);
            })
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

    isAdminGuard(){
        let token=localStorage.getItem('token')
        if(token){
            let rol=this.decodeJwt(token).role
            if(rol=='ADMIN'){
                return true
            }
        }
            return false
        
    }

    decodeJwt(jwt: string): DecodeToken{
        return jwt_decode(jwt)
    }


    
    
}