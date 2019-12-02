import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SystemComponent} from './system.component';
import {SystemRoutingModule} from './system-routing.module';
import {NeverComponent} from './components/never/never.component';
import {MostComponent} from './components/most/most.component';
import {LatestComponent} from './components/latest/latest.component';
import {FindCarComponent} from './components/find/find-car.component';
import {SearchFiltersComponent} from './components/searchFilters/searchFilters.component';
import {SearchMapComponent} from './components/searchMap/searchMap.component';
import {CarDetailsComponent} from './components/carDetails/carDetails.component';
import {AddCarComponent} from './components/addCar/addCar.component';
import { SearchPriceComponent } from './components/searchPrice/searchPrice.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import {AgmCoreModule} from '@agm/core';
import {FileUploadModule} from 'ng2-file-upload';
import { NpnSliderModule } from "npn-slider";
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';



@NgModule({
  declarations: [
    SystemComponent,
    NeverComponent,
    MostComponent,
    LatestComponent,
    FindCarComponent,
    SearchFiltersComponent,
    SearchMapComponent,
    CarDetailsComponent,
    AddCarComponent,
    SearchPriceComponent,
    GoogleMapsComponent
  ],
  exports: [
    LatestComponent,
    NeverComponent,
    MostComponent,
    GoogleMapsComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    FormsModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZ9wGJSeKuaVXHJg3sKovhlZybGI7fW7A',
      libraries: ['places']
    }),
    FileUploadModule,
    NpnSliderModule,
    AngularMultiSelectModule,
    AgmJsMarkerClustererModule
  ]
})
export class SystemModule { }



