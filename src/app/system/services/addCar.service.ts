import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {CarModel} from '../shared/models/car.model';


const url = 'https://rent-cars-app.herokuapp.com';

@Injectable({
  providedIn: 'root'
})
export class AddCarService {
  user = this.authService.user;

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getCarsList() {
    return this.http.get<[]>('./assets/data_collection/car-list.json');
  }


  addCar(value) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': 'Basic ' + btoa(this.user.value.email + ':' + this.user.value.password)
      })
    };
    return this.http.post<CarModel>(url + '/car', value, options)
  }

  updateCar(value, carNumber) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'Authorization': 'Basic ' + btoa(this.user.value.email + ':' + this.user.value.password)
      }),
      params: new HttpParams().set('serial_number', carNumber)
    };
    return this.http.put<CarModel>(url + '/car', value, options)
  }

  getCar(value: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('serial_number', value);
    return this.http.get<CarModel>(url + '/car',{
      params: searchParams
    })
  }

}
