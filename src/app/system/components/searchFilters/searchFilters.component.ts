import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchCarService} from '../../services/search-car.service';
import {ResDataModel} from '../../shared/models/resData.model';
import {ReqDataModel} from '../../shared/models/reqData.model';

@Component({
  selector: 'app-searchFilters',
  templateUrl: './searchFilters.component.html',
  styleUrls: ['./searchFilters.component.css']
})
export class SearchFiltersComponent implements OnInit {

  isLoading = false;
  resData: ResDataModel;
  resCars = [];
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
  filters = [];
  makes = [];
  modelsName= [];
  models = [];
  yearsName = [];
  years = [];
  enginesName = [];
  engines = [];
  fuelsName = [];
  fuels = [];
  gearsName = [];
  gears = [];
  wheels_drivesName = [];
  wheels_drives = [];
  fuel_consumptionsName = [];
  fuel_consumptions = [];
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

  constructor(private activatedRoute: ActivatedRoute,
              private searchCarService: SearchCarService,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.params
      .subscribe(data => {
        this.reqData.city = data.city;
        this.reqData.start_date = data.start_date;
        this.reqData.end_date = data.end_date;
      });

    this.searchCarService.getFilters()
      .subscribe(data => {
        this.filters = data;
        this.getMake();
        this.isLoading = false;
      }, message => {
        console.log(message);
        this.isLoading = false;
      });

    // this.searchCarService.searchCarsByPrice(this.reqData)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.resData = res;
    //     this.resCars = this.resData.cars;
    //     this.isLoading = false;
    //   }, message => {
    //     console.log(message);
    //     this.isLoading = false;
    //   })
  }

  getMake() {
    this.filters.forEach(e => {
       this.makes.push(e.make);
    });
  }

  getModel(val) {
    this.modelsName = [];
    this.yearsName = [];
    this.enginesName = [];
    this.fuelsName = [];
    this.gearsName = [];
    this.wheels_drivesName = [];
    this.fuel_consumptionsName = [];
    this.filters.forEach(e => {
      if (e.make === val) {
        this.models = e.models;
        e.models.forEach(m => {
          this.modelsName.push(m.model)
        })
      }
    })
  }

  getYear(val) {
    this.yearsName = [];
    this.enginesName = [];
    this.fuelsName = [];
    this.gearsName = [];
    this.wheels_drivesName = [];
    this.fuel_consumptionsName = [];
    this.models.forEach(e => {
      if(e.model === val) {
        this.years = e.years;
        e.years.forEach(y => {
          this.yearsName.push(y.year)
        })
      }
    })
  }

  getEngine (val) {
    this.enginesName = [];
    this.fuelsName = [];
    this.gearsName = [];
    this.wheels_drivesName = [];
    this.fuel_consumptionsName = [];
    this.years.forEach(e => {
      if(e.year === val) {
        this.engines = e.engines;
        e.engines.forEach(e => {
          this.enginesName.push(e.engine)
        })
      }
    })
  }

  getFuel(val) {
    this.fuelsName = [];
    this.gearsName = [];
    this.wheels_drivesName = [];
    this.fuel_consumptionsName = [];
    this.engines.forEach(e => {
      if(e.engine === val) {
        this.fuels = e.fuels;
        e.fuels.forEach(y => {
          this.fuelsName.push(y.fuel)
        })
      }
    })
  }

  getGear(val) {
    this.gearsName = [];
    this.wheels_drivesName = [];
    this.fuel_consumptionsName = [];
    this.fuels.forEach(e => {
      if(e.fuel === val) {
        this.gears = e.gears;
        e.gears.forEach(g => {
          this.gearsName.push(g.gear)
        })
      }
    })
  }

  getWD(val) {
    this.wheels_drivesName = [];
    this.fuel_consumptionsName = [];
    this.gears.forEach(e => {
      if(e.gear === val) {
        this.wheels_drives = e.wheels_drives;
        e.wheels_drives.forEach(g => {
          this.wheels_drivesName.push(g.wheels_drive)
        })
      }
    })
  }

  getFC(val) {
    this.fuel_consumptionsName = [];
    this.wheels_drives.forEach(e => {
      if(e.wheels_drive === val) {
        if(e.fuel_consumptions){
          this.fuel_consumptions = e.fuel_consumptions;
          e.fuel_consumptions.forEach(g => {
            this.fuel_consumptionsName.push(g.fuel_consumption)
          })
        }
      }
    })
  }






  carDetails(value) {
    let data = value;
    console.log(data);
    this.router.navigate(['/system/carDetails', data])
  }

  searchPrice() {
    let data = this.reqData;
    this.router.navigate(['/system/searchPrice', data])
  }

  setMap() {
    let data = this.reqData;
    this.router.navigate(['/system/searchMap', data])
  }

}
