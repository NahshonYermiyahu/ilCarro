import { Injectable } from '@angular/core';
import {AddCarService} from './addCar.service';
import { NgZone } from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {LocationModel} from '../shared/models/location.model';
import {Pick_up_placeModel} from '../shared/models/pick_up_place.model';
import {Observable, of} from 'rxjs';

declare var google: any;

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


@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  public pick_up_place: PickUpPlace = {
    latitude: 0,
    longitude: 0,
    place_id: ''
  };
  public location: Location = {
    city: '',
    street_number: '',
    route: '',
    country: '',
    zip: '',
    region: ''
  };
  geocoder: any;

  constructor(private letCarService: AddCarService,
              public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    })
  }


  getPickUpPlaceByAddress(address: LocationModel): Observable<any> {

    let fullAddress: string = address.street || "";
    if (address.city) {
      fullAddress = fullAddress + " " + address.city;
    }
    if (address.region) {
      fullAddress = fullAddress + " " + address.region;
    }
    if (address.country) {
      fullAddress = fullAddress + " " + address.country;
    }
    if (address.zip) {
      fullAddress = fullAddress + " " + address.zip;
    }

    if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
    return Observable.create(observer => {
      this.geocoder.geocode({
        'address': fullAddress
      }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(this.pick_up_place = {
              latitude: results[0].geometry.viewport.getCenter().lat(),
              longitude: results[0].geometry.viewport.getCenter().lng(),
              place_id: results[0].place_id
            }
          );
          observer.complete();
        } else {
          console.log('Error: ', results, ' & Status: ', status);
          observer.error();
        }
      });
    });
  }


  getAddressByCoordinates(place: Pick_up_placeModel): Observable<any> {
    if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(place.latitude, place.longitude);
    return Observable.create(observer => {
      this.geocoder.geocode({
        'location': latlng
      }, (results, status) => {
        // let place = results[0];
        if (status == google.maps.GeocoderStatus.OK) {
          observer.next(this.location = {
            city: results[0].address_components
              .find(d => d.types.indexOf('locality') != -1).long_name,
            street_number: results[0].address_components
              .find(d => d.types.indexOf('street_number') != -1).long_name,
            route: results[0].address_components
              .find(d => d.types.indexOf('route') != -1).long_name,
            country: results[0].address_components
              .find(d => d.types.indexOf('country') != -1).long_name,
            zip:  results[0].address_components
              .find(d => d.types.indexOf('postal_code') != -1) ?
              results[0].address_components
              .find(d => d.types.indexOf('postal_code') != -1)
                .long_name : '',
            region: results[0].address_components
              .find(d => d.types.indexOf('administrative_area_level_2') != -1) ?
              results[0].address_components
              .find(d => d.types.indexOf('administrative_area_level_2') != -1)
                .long_name : ''
            }
          );
          observer.complete();
        } else {
          console.log('Error: ', results, ' & Status: ', status);
          observer.error();
        }
      });
    });
  }
}


  // getPickUpPlace(carNumber){
  //     this.letCarService.getCar(carNumber)
  //      .subscribe(car => {
  //         return car.pick_up_place
  //      })
  // }

  // getPickUpPlace(carNumer){
  //   return {
  //     "place_id": "string",
  //     "latitude": 31.912363,
  //     "longitude": 34.8047923}
  // }


// getPickUpPlaceByAddress(address: LocationModel):Observable<PickUpPlace>{
//   //if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
//
//   let fullAddress:string = address.street || "";
//   if (address.city){
//     fullAddress = fullAddress + " " + address.city;
//   }
//   if (address.region){
//     fullAddress = fullAddress + " " + address.region;
//   }
//   if (address.country){
//     fullAddress = fullAddress + " " + address.country;
//   }
//   if (address.zip){
//     fullAddress = fullAddress + " " + address.zip;
//   }
//   return of(this.(fullAddress))
// }

// findLocation(address){
//   // if (!this.geocoder) this.geocoder = new google.maps.Geocoder();
//   this.geocoder.geocode({
//     'address': address
//   }, (results, status) => {
//     if (status == google.maps.GeocoderStatus.OK) {
//       if (results[0].geometry.location) {
//         console.log(results[0]);
//         this.pick_up_place.place_id = results[0].place_id;
//         this.pick_up_place.latitude = results[0].geometry.viewport.getCenter().lat();
//         this.pick_up_place.longitude = results[0].geometry.viewport.getCenter().lng();
//
//         console.log(this.pick_up_place);
//       }
//     } else {
//       alert("Sorry, this search produced no results.");
//     }
//   });
//   return this.pick_up_place;
// }
