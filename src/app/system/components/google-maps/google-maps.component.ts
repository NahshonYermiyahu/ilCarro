import { Component, OnInit } from '@angular/core';

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  marker?: Marker;
}

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  public location:Location = {
    lat: 31.912363,
    lng: 34.8047923,
    marker: {
      lat: 31.912363,
      lng: 34.8047923,
      draggable: true
    },
    zoom: 12
  };

  constructor(){}

  ngOnInit() {
    this.location.marker.draggable = true;
  }

  markerDragEnd(m: any) {
    this.location.marker.lat = m.coords.lat;
    this.location.marker.lng = m.coords.lng;
  }





}
