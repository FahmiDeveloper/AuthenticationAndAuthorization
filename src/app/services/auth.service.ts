import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from "rxjs/operators";
import { JwtHelper, tokenNotExpired } from 'angular2-jwt'; 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:Http) { }

  login(credentials){
    return this.http.post('api/auhtenticate', JSON.stringify(credentials))
    .pipe(
      map(response => {
        let result = response.json();
        if(result && result.token){
          localStorage.setItem('token', result.token);
          return true;
        }
        return false;
      }
    ));
  }

  logOut(){
    localStorage.removeItem('token');
  }

  isLoggedIn(){
    return tokenNotExpired();

    /*let jwtHelper = new JwtHelper();
    let token = localStorage.getItem('token');

    if(!token)
    return false;

    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

    return !isExpired;*/
  }

  get currentUser(){
    let token = localStorage.getItem('token');
    if (!token) return null;

    return new JwtHelper().decodeToken(token);
  }

}
