import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private authHttp:AuthHttp) { }

  getOrders(){
    return this.authHttp.get('/api/orders')
    .pipe(
      map(response => response.json()));
  }
}
