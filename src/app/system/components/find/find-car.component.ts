import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-find-car',
  templateUrl: './find-car.component.html',
  styleUrls: ['./find-car.component.css']
})
export class FindCarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit(ngForm: NgForm) {
    console.log(ngForm.form.value)

  }
}
