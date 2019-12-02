import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchCarService} from '../../services/search-car.service';
import {ResDataModel} from '../../shared/models/resData.model';
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

  cars = [
    {
      "serial_number": "777-77-777",
      "make": "Volvo",
      "model": "S70",
      "year": "1999",
      "engine": "2.5L V5 DOHC 20V",
      "fuel": "Petrol",
      "gear": "Manual",
      "wheels_drive": "FWD",
      "doors": 4,
      "seats": 5,
      "fuel_consumption": 12,
      "features": [
        "22 inch wheels",
        "Heated front seats",
        "Meridian sound system",
      ],
      "car_class": "S",
      "price_per_day":25,
      "distance_included":200,
      "about":  "BRAND NEW FULLY LOADED CUSTOM 2018 RANGE ROVER HSE with" +
        " a 3.0 Liter Supercharged V6 Engine. The Range Rover HSE has a 380" +
        " horsepower V6, 8-Speed automatic transmission with gearshift " +
        "paddles, all wheel drive, sliding panoramic roof, Bluetooth and USB," +
        " touch screen interface with navigation and interactive driver display." +
        " ADDITIONAL CUSTOM UPGRADES INCLUDE painted brake calibers yellow with" +
        " decals, powder coated wheels gloss black, window tint 35%, and full" +
        " blackout package.",
      "pick_up_place": {
        "place_id": "string",
        "latitude": 32.0702462,
        "longitude": 34.824585100000036
      },
      "image_url": [
        "https://a.d-cd.net/4e0c9b9s-1920.jpg",
        "https://a.d-cd.net/3c0c9b9s-1920.jpg"
      ],
      "owner": {
        "first_name": "Brian",
        "second_name": "O'Conner",
        "registration_date": "2019-09-14"
      },
      "booked_periods":[
        {
          "start_date_time": "YYYY-MM-dd HH:mm",
          "end_date_time": "YYYY-MM-dd HH:mm"
        }
      ]
    },
    {
      "serial_number": "135-79-531",
      "make": "Volvo",
      "model": "S70",
      "year": "2001",
      "engine": "2.5L V5 DOHC 20V",
      "fuel": "Petrol",
      "gear": "Automatic",
      "wheels_drive": "FWD",
      "doors": 4,
      "seats": 5,
      "fuel_consumption": 12,
      "features": [
        "22 inch wheels",
        "Heated front seats",
        "Meridian sound system",
      ],
      "car_class": "Ы",
      "price_per_day":25,
      "distance_included":155,
      "about":"BRAND NEW FULLY LOADED CUSTOM 2018 RANGE ROVER HSE with" +
        " a 3.0 Liter Supercharged V6 Engine. The Range Rover HSE has a 380" +
        " horsepower V6, 8-Speed automatic transmission with gearshift " +
        "paddles, all wheel drive, sliding panoramic roof, Bluetooth and USB," +
        " touch screen interface with navigation and interactive driver display." +
        " ADDITIONAL CUSTOM UPGRADES INCLUDE painted brake calibers yellow with" +
        " decals, powder coated wheels gloss black, window tint 35%, and full" +
        " blackout package.",
      "pick_up_place": {
        "place_id": "string",
        "latitude": 32.067769900000016,
        "longitude": 34.7735631000005
      },
      "image_url": [
        "https://a.d-cd.net/4e0c9b9s-1920.jpg",
        "https://a.d-cd.net/3c0c9b9s-1920.jpg"
      ],
      "owner": {
        "first_name": "Brian",
        "second_name": "O'Conner",
        "registration_date": "2019-09-14"
      },
      "booked_periods":[
        {
          "start_date_time": "YYYY-MM-dd HH:mm",
          "end_date_time": "YYYY-MM-dd HH:mm"
        }
      ]
    },
    {
      "serial_number": "147-85-23",
      "make": "Volvo",
      "model": "S70",
      "year": "2000",
      "engine": "2.5L V5 DOHC 20V",
      "fuel": "Petrol",
      "gear": "Automatic",
      "wheels_drive": "FWD",
      "doors": 4,
      "seats": 5,
      "fuel_consumption": 12,
      "features": [
        "22 inch wheels",
        "Power gestured roof",
        "Heated front seats",
        "Heated steering wheel",
      ],
      "car_class": "S",
      "price_per_day":25,
      "distance_included":145,
      "about":  "BRAND NEW FULLY LOADED CUSTOM 2018 RANGE ROVER HSE " +
        "with a 3.0 Liter Supercharged V6 Engine. The Range Rover HSE " +
        "has a 380 horsepower V6, 8-Speed automatic transmission with" +
        " gearshift paddles, all wheel drive, sliding panoramic roof," +
        " Bluetooth and USB, touch screen interface with navigation and" +
        " interactive driver display. ADDITIONAL CUSTOM UPGRADES INCLUDE " +
        "painted brake calibers yellow with decals, powder coated wheels " +
        "gloss black, window tint 35%, and full blackout package.",
      "pick_up_place": {
        "place_id": "string",
        "latitude": 32.0552486,
        "longitude": 34.761041399999954
      },
      "image_url": [
        "https://a.d-cd.net/4e0c9b9s-1920.jpg",
        "https://a.d-cd.net/3c0c9b9s-1920.jpg"
      ],
      "owner": {
        "first_name": "Brian",
        "second_name": "O'Conner",
        "registration_date": "2019-09-14"
      },
      "booked_periods":[
        {
          "start_date_time": "YYYY-MM-dd HH:mm",
          "end_date_time": "YYYY-MM-dd HH:mm"
        }
      ]
    },
    {
      "serial_number": "951-74-96",
      "make": "Honda",
      "model": "Accord",
      "year": "2017",
      "engine": "2.4L V6 DOHC 24V AWD",
      "fuel": "Petrol",
      "gear": "Automatic",
      "wheels_drive": "FWD",
      "doors": 4,
      "seats": 5,
      "fuel_consumption": 14,
      "features": [
        "Ambient interior lighting",
        "Meridian sound system",
        "Interactive driver display",
        "Lane departure warning",
        "Emergency braking"
      ],
      "car_class": "S",
      "price_per_day":30,
      "distance_included":120,
      "about":  "string",
      "pick_up_place": {
        "place_id": "string",
        "latitude": 32.08096220000016,
        "longitude": 34.77758659999995
      },
      "image_url": [
        "https://a.d-cd.net/4e0c9b9s-1920.jpg",
        "https://a.d-cd.net/3c0c9b9s-1920.jpg"
      ],
      "owner": {
        "first_name": "Brian",
        "second_name": "O'Conner",
        "registration_date": "2019-09-14"
      },
      "booked_periods":[
        {
          "start_date_time": "YYYY-MM-dd HH:mm",
          "end_date_time": "YYYY-MM-dd HH:mm"
        }
      ]
    }

  ];
  resData: ResDataModel;
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

  isLoading = false;

  constructor(private activatedRoute: ActivatedRoute,
              private searchCarService: SearchCarService,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.params
      .subscribe(data => {
        console.log(data);
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
    this.isLoading = true;
    let reqData = SearchPriceComponent.reqDataReplace(this.reqData);
    this.searchCarService.searchCarsByPrice(reqData)
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

  static reqDataReplace(value) {
    let start = value.start_date.replace('T', ' ');
    let end = value.end_date.replace('T', ' ');
    return new ReqDataModel(
      value.cite,
      start,
      end,
      value.min_amount,
      value.max_amount,
      value.ascending,
      value.items_on_page,
      value.current_page
    );
  }

  setMap() {
    let data = this.reqData;
    this.router.navigate(['/system/searchMap', data])
  }

  carDetails(value) {
    let data = value;
    console.log(data);
    this.router.navigate(['/system/carDetails', data])
  }

  setFilters() {
    let data = this.reqData;
    this.router.navigate(['/system/searchFilters', data])
  }
}
