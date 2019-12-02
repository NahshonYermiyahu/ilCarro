import {NgForm} from '@angular/forms';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoogleMapsService} from '../../services/google-maps.service';
import {AddCarService} from '../../services/addCar.service';
import {CarModel} from '../../shared/models/car.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';


interface PickUpPlace {
  latitude: number;
  longitude: number;
  place_id: string;
}

interface Location {
  city:string;
  street_number: string;
  route: string;
  country: string;
  zip?: string;
  region?: string;
}

@Component({
  selector: 'app-carDetails',
  templateUrl: './carDetails.component.html',
  styleUrls: ['./carDetails.component.css']
})
export class CarDetailsComponent implements OnInit, OnDestroy {

  carNumber: string;
  car:CarModel;
  sub: Subscription;
  sub1: Subscription;
  zoom = 12;
  public location: Location = {
    city: '',
    street_number: '',
    route: '',
    country: '',
    zip: '',
    region: ''
  };
  public pick_up_place: PickUpPlace = {
    latitude: 0,
    longitude: 0,
    place_id: '',
  };
  isLoading = false;

  constructor(private googleMapsService: GoogleMapsService,
              private activatedRoute: ActivatedRoute,
              private addCarService: AddCarService) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.params
      .subscribe(data => {
        this.carNumber = data.serial_number;

      });
     this.sub = this.addCarService.getCar(this.carNumber)
       .subscribe(data => {
      this.car = data;
      this.pick_up_place = data.pick_up_place;
       this.sub1 = this.googleMapsService
         .getAddressByCoordinates(this.pick_up_place)
         .subscribe(data => {
           this.location = data;
           this.isLoading = false;
         }, errorMessage => {
           console.log(errorMessage);
           this.isLoading = false;
         });
    },errorMessage => {
      console.log(errorMessage);
       this.isLoading = false;
    });

  }

  onSubmit(ngForm: NgForm) {
    console.log(ngForm.form.value)
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
    if(this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}


// const carData = {
//   serial_number: "123-67-123",
//   make: "Audi",
//   model: "A6",
//   year: "2012",
//   engine: "3.0L V6 DOHC 24V",
//   fuel: "Gas",
//   gear: "Automatic",
//   wheels_drive: "FWD",
//   doors: 4,
//   seats: 5,
//   fuel_consumption: 12.5,
//   features: ["22 inch wheels","Power gestured roof", "Heated front seats",
//     "Heated steering wheel","Ambient interior lighting","Meridian sound system",
//     "Interactive driver display","Lane departure warning","Emergency braking",
//     "Traffic sign recognition","Adaptive speed limiter"],
//   car_class: "C",
//   price_per_day:43,
//   distance_included:20,
//   about:  "BRAND NEW FULLY LOADED CUSTOM 2018 RANGE ROVER HSE with a " +
//     "3.0 Liter Supercharged V6 Engine. The Range Rover HSE has a 380 horsepower V6," +
//     " 8-Speed automatic transmission with gearshift paddles, all wheel drive," +
//     " sliding panoramic roof, Bluetooth and USB, touch screen interface with " +
//     "navigation and interactive driver display. ADDITIONAL CUSTOM UPGRADES INCLUDE" +
//     " painted brake calibers yellow with decals, powder coated wheels gloss black," +
//     " window tint 35%, and full blackout package.",
//   pick_up_place: {
//     "place_id": "string",
//     "latitude": 59.92604,
//     "longitude": 30.377352900000005
//   },
//   image_url: [
//     "https://a.d-cd.net/4e0c9b9s-1920.jpg",
//     "https://a.d-cd.net/3c0c9b9s-1920.jpg"
//   ],
//   owner: {
//     first_name: "Brian",
//     second_name: "O'Conner",
//     registration_date: "2019-09-14"
//   },
//   booked_periods:[
//     {
//       start_date_time: "YYYY-MM-dd HH:mm",
//       end_date_time: "YYYY-MM-dd HH:mm"
//     }
//   ]
// };
