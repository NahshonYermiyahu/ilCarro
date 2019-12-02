import {Component, Input, OnInit} from '@angular/core';
import {ClusterStyle} from '@agm/js-marker-clusterer/services/google-clusterer-types';

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

  @Input()latitude;
  @Input()longitude;
  @Input()zoom;
  @Input()markersInput;

  public location:Location = {
    lat: 32.087931499999996,
    lng: 34.79724599999997,
    marker: {
      lat: 32.087931499999996,
      lng: 34.79724599999997,
      draggable: true
    },
    zoom: 12
  };
  markers: any;
  clusterStyles: ClusterStyle[];


  constructor(){}

  ngOnInit() {
    this.location.marker.draggable = true;
    this.location.lat = this.latitude;
    this.location.lng = this.longitude;
    this.location.marker.lat = this.latitude;
    this.location.marker.lng = this.longitude;
    this.markers = this.markersInput;
    this.clusterStyles =[
      {
        textSize: 22,
        url: "assets/icons/cluster_8230.png",
        height: 37,
        width: 32
      }]
  }

  markerDragEnd(m: any) {
    this.location.marker.lat = m.coords.lat;
    this.location.marker.lng = m.coords.lng;
  }





}
