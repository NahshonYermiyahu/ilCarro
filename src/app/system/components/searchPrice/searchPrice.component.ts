import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SearchCarService} from '../../services/search-car.service';
import { ResDataModel} from '../../shared/models/resData.model';
import {ReqDataModel} from '../../shared/models/reqData.model';

// interface ReqData {
//   city: string;
//   start_date: string;
//   end_date: string;
//   min_amount: number;
//   max_amount: number;
//   ascending: boolean;
//   items_on_page: number;
//   current_page: number;
// }

// interface ResData {
//   "current_page": number;
//   "items_on_page": number;
//   "items_total": number;
//   cars: [];
// }

@Component({
  selector: 'app-sear',
  templateUrl: './searchPrice.component.html',
  styleUrls: ['./searchPrice.component.css']
})
export class SearchPriceComponent implements OnInit {

  dataFind: any;
  resData: ResDataModel;
  // resData: ResDataModel ={
  //   "current_page": 0,
  //   "items_on_page": 0,
  //   "items_total": 0,
  //   cars: []
  // };
  resCars = [];

  reqData: ReqDataModel = {
    city: '',
    start_date: '',
    end_date: '',
    min_amount: 0,
    max_amount: 0,
    ascending: true,
    items_on_page: 10,
    current_page: 1
  };

  cars = [
    {
      "serial_number": "123-67-123",
      "make": "Audi",
      "model": "A6",
      "year": "2012",
      "engine": "3.0L V6 DOHC 24V AWD",
      "fuel": "Gas",
      "gear": "Automatic",
      "wheels_drive": "RWD",
      "doors": 4,
      "seats": 5,
      "fuel_consumption": 12.5,
      "features": [],
      "car_class": "C",
      "price_per_day":43.5,
      "distance_included":20
    },
    {
      "serial_number": "123-67-123",
      "make": "Audi",
      "model": "A6",
      "year": "2012",
      "engine": "3.0L V6 DOHC 24V AWD",
      "fuel": "Gas",
      "gear": "Automatic",
      "wheels_drive": "RWD",
      "doors": 4,
      "seats": 5,
      "fuel_consumption": 12.5,
      "features": [],
      "car_class": "C",
      "price_per_day":44.5,
      "distance_included":20
    },
    {
      "serial_number": "123-67-123",
      "make": "Audi",
      "model": "A6",
      "year": "2012",
      "engine": "3.0L V6 DOHC 24V AWD",
      "fuel": "Gas",
      "gear": "Automatic",
      "wheels_drive": "RWD",
      "doors": 4,
      "seats": 5,
      "fuel_consumption": 12.5,
      "features": [],
      "car_class": "C",
      "price_per_day":41.5,
      "distance_included":20
    },
    {
      "serial_number": "123-67-123",
      "make": "Audi",
      "model": "A6",
      "year": "2012",
      "engine": "3.0L V6 DOHC 24V AWD",
      "fuel": "Gas",
      "gear": "Automatic",
      "wheels_drive": "RWD",
      "doors": 4,
      "seats": 5,
      "fuel_consumption": 12.5,
      "features": [],
      "car_class": "C",
      "price_per_day":42.5,
      "distance_included":20
    }

  ];
  isLoading = false;

  constructor(private activatedRoute: ActivatedRoute,
              private searchCarService: SearchCarService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dataFind = this.activatedRoute.params
      .subscribe(data => {
        this.reqData.city = data.city;
        this.reqData.start_date = data.start_date;
        this.reqData.end_date = data.end_date;
        this.isLoading = false;
      })
  }

  onSliderChange(selectedValues: number[]) {
    this.reqData.min_amount = selectedValues[0];
    this.reqData.max_amount = selectedValues[1];
    this.onSubmit();
  }

  sortCarsPriceLowToHigh(){
    this.resCars.sort((a,b) => {
      return a.price_per_day - b.price_per_day;
    });
  }

  sortCarsPriceHighToLow(){
    this.resCars.sort((a,b) => {
      return b.price_per_day - a.price_per_day;
    });
  }

  onSubmit() {
    console.log(this.reqData);
    this.isLoading = true;
    this.searchCarService.searchCars(this.reqData)
      .subscribe(res => {
        console.log(res);
        this.resData = res;
        this.resCars = this.resData.cars;
        this.isLoading = false;
      }, message => {
        console.log(message);
        this.isLoading = false;
      })
  }
}
