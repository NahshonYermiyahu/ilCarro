import {Component, OnDestroy, OnInit, ViewChild, ElementRef, NgZone} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AddCarService} from '../../services/addCar.service';
import {CarModel} from '../../shared/models/car.model';
import {LocationModel} from '../../shared/models/location.model';
import {GoogleMapsService} from '../../services/google-maps.service';
import {Subscription} from 'rxjs';
import { MapsAPILoader } from '@agm/core';
// @ts-ignore
import {} from '@types/googlemaps';
import {Pick_up_placeModel} from '../../shared/models/pick_up_place.model';
import { MultiSelect } from '@syncfusion/ej2-dropdowns';




@Component({
  selector: 'app-addCar',
  templateUrl: './addCar.component.html',
  styleUrls: ['./addCar.component.css']
})
export class AddCarComponent implements OnInit, OnDestroy {

  @ViewChild('search', {static: false}) public searchElement: ElementRef;
  carsBrand = [];
  carModels = [];
  cars = [];
  isLoading = false;
  error: string = null;
  numberCar: string = '';
  numberCarInput: string = '';
  location = new LocationModel('','','','','');
  sub: Subscription;
  sub1: Subscription;
  carData: CarModel;
  features = [
    "22 inch wheels",
    "Power gestured roof",
    "Heated front seats",
    "Heated steering wheel",
    "Ambient interior lighting",
    "Meridian sound system",
    "Interactive driver display",
    "Lane departure warning",
    "Emergency braking",
    "Traffic sign recognition",
    "Adaptive speed limiter"
  ];


  constructor(private addCarService: AddCarService,
              private googleMapsService: GoogleMapsService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.addCarService.getCarsList()
      .subscribe(data => {
        this.cars = data;
        this.carsBrand = this.getCarsBrand(data);
      });

    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places
          .Autocomplete(
            this.searchElement.nativeElement,
            {types: ['(cities)']}
          );
        // autocomplete.addListener("place_changed", () => {
        //     this.ngZone.run(() => {
        //       let place: google.maps.places
        //         .PlaceResult = autocomplete.getPlace();
              // if (place.geometry === undefined || place.geometry === null) {
              //   return;
              // }
              // for (let i = 0; i < place.address_components.length; i++) {
              //   let types = place.address_components[i].types;
              //
              //   if (types.indexOf('locality') != -1) {
              //     this.location.city = place
              //       .address_components[i].long_name
              //   }
              //   if (types.indexOf('country') != -1) {
              //     this.location.country = place
              //       .address_components[i].long_name
              //   }
              //   if (types.indexOf('route') != -1) {
              //     this.location.street = place
              //       .address_components[i].long_name.concat(", ", this.location.street);
              //   }
              //   if (types.indexOf('postal_code') != -1) {
              //     this.location.zip = place
              //       .address_components[i].long_name
              //   }
              //   if (types.indexOf('administrative_area_level_2') != -1) {
              //     this.location.region = place
              //       .address_components[i].long_name
              //   }
              //   if (types.indexOf('street_number') != -1) {
              //     this.location.street = place.
              //       address_components[i].long_name.concat(", ", this.location.street);
              //   }
              // }
          //   });
          // }
        //);
      })
  }

  getCarByNumber(value) {
    this.isLoading = true;
    this.numberCar = '';
    return this.addCarService.getCar(value)
      .subscribe(resData => {
      console.log(resData);
      if(resData.serial_number === value) {
        this.carData = resData;
        this.numberCar = value;
        this.changeCarModels(this.carData.make);
      }else {
        this.numberCarInput = value;
      }
        this.isLoading = false;
    }, errorMessage => {
        console.log(errorMessage);
      this.numberCarInput = value;
      this.isLoading = false;
    })
  }

  changeCarModels(value) {
    this.carModels = this.getCarModels(this.cars, value);
  }

  getCarsBrand(data) {
    let carsBrand = [];
    data.forEach(d => {
        carsBrand.push(d.brand);
      });
    return carsBrand;
  }

  getCarModels(data, brand) {
    let carModels = [];
    data.forEach(d => {
      if(d.brand === brand) {
        carModels.push(d.models)
      }
    });
     return carModels[0];
  }

  onSubmit(setForm: NgForm) {

    let formData = setForm.form.value;
    if(!setForm.valid) {return;}
    this.isLoading = true;
    let image_url = [
      'https://avatars.mds.yandex.net/get-pdb/812271/dd0cfc93-0721-4ef8-ab82-7116065d0bd7/s1200',
      'https://avatars.mds.yandex.net/get-pdb/904462/4da2674b-00b8-4cf2-893b-3100532f92af/s1200'
    ];
    let pick_up_place = new Pick_up_placeModel('', 0, 0);

    if(this.numberCar.length > 0) {
      this.sub1 = this.googleMapsService.getPickUpPlaceByAddress(this.location)
        .subscribe(res => {
          pick_up_place = res;
          let reqData = {...formData, pick_up_place, image_url};
          this.addCarService.updateCar(reqData,this.numberCar).subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
          }, errorMessage => {
            console.log(errorMessage);
            this.isLoading = false;
          });
        });
    } else {
      this.sub = this.googleMapsService.getPickUpPlaceByAddress(this.location)
        .subscribe(res => {
          pick_up_place = res;
          let reqData = {...formData, pick_up_place, image_url};
          this.addCarService.addCar(reqData).subscribe(resData => {
            console.log(resData);
            this.isLoading = false;
          }, errorMessage => {
            console.log(errorMessage);
            this.isLoading = false;
          });
        });
    }
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

// carData1 = new CarModel(
//   "123-67-123",
//   "Audi",
//   "A6",
//   "2012",
//   "3.0L V6 DOHC 24V AWD",
//   "Gas",
//   "Automatic",
//   "RWD",
//   4,
//   5,
//   12.5,
//   [],
//   "C",
//   43.5,
//   20,
//   "string",
//   {
//     "place_id": "string",
//     "latitude": 31.912363,
//     "longitude": 34.8047923
//   },
//   [
//     "https://a.d-cd.net/4e0c9b9s-1920.jpg",
//     "https://a.d-cd.net/3c0c9b9s-1920.jpg"
//   ],
//   {
//     "first_name": "Brian",
//     "second_name": "O'Conner",
//     "registration_date": "2019-09-14"
//   },
//   [
//     {
//       "start_date_time": "YYYY-MM-dd HH:mm",
//       "end_date_time": "YYYY-MM-dd HH:mm"
//     }
//   ]
// );

// contrNum(numberInput) {
//   this.carData = this.carData1;
//   this.numberCar = numberInput;
//   this.changeCarModels(this.carData.make);
// }
