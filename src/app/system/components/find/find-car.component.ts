import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {GoogleMapsService} from '../../services/google-maps.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-find-car',
  templateUrl: './find-car.component.html',
  styleUrls: ['./find-car.component.css']
})
export class FindCarComponent implements OnInit {

  startDate: any;
  endDate: any;

  constructor(private googleMapsService: GoogleMapsService,
              private router: Router) {
     this.startDate = Date.now();
     this.endDate = Date.now();
  }

  ngOnInit() {
  }

  onSubmit(ngForm: NgForm) {
    let data = ngForm.form.value;
    this.router.navigate(['/system/searchPrice',data]);
  }
}
