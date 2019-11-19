import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {SearchCarService} from '../../services/search-car.service';

interface ReqData {
  city: string;
  start_date: string;
  end_date: string;
  min_amount: number;
  max_amount: number;
  ascending: boolean;
  items_on_page: number;
  current_page: number;
}

@Component({
  selector: 'app-sear',
  templateUrl: './searchPrice.component.html',
  styleUrls: ['./searchPrice.component.css']
})
export class SearchPriceComponent implements OnInit {

  dataFind: any;
  reqData: ReqData = {
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
              private searchCarService: SearchCarService) { }

  ngOnInit() {
    this.dataFind = this.activatedRoute.params
      .subscribe(data => {
        this.reqData.city = data.city;
        this.reqData.start_date = data.start_date;
        this.reqData.end_date = data.end_date;
        this.onSubmit();
      })
  }

  onSliderChange(selectedValues: number[]) {
    this.reqData.min_amount = selectedValues[0];
    this.reqData.max_amount = selectedValues[1];
    this.onSubmit();
  }

  onSubmit() {
    console.log(this.reqData);
    this.searchCarService.searchCars(this.reqData)
      .subscribe(res => {
        console.log(res)
      }, message => {
        console.log(message);
      })
  }
}
