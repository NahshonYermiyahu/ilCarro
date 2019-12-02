import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {SearchCarService} from '../../services/search-car.service';



@Component({
  selector: 'app-find-car',
  templateUrl: './find-car.component.html',
  styleUrls: ['./find-car.component.css']
})
export class FindCarComponent implements OnInit {

  startDate:any;
  endDate: any;

  constructor(private searchCarService: SearchCarService,
              private router: Router) {
     this.startDate = new Date().toString();
     this.endDate = new Date().toString();
  }

  ngOnInit() {
  }

  onSubmit(ngForm: NgForm) {
    let data = ngForm.form.value;
    this.router.navigate(['/system/searchPrice',data]);
  }
}
