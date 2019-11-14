import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FindCarComponent} from './components/find/find-car.component';
import {SystemComponent} from './system.component';
import {SearchFiltersComponent} from './components/searchFilters/searchFilters.component';
import {SearchPriceComponent} from './components/searchPrice/searchPrice.component';
import {SearchMapComponent} from './components/searchMap/searchMap.component';
import {AddCarComponent} from './components/addCar/addCar.component';
import {CarDetailsComponent} from './components/carDetails/carDetails.component';
import {AuthGuard} from '../auth/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    canActivate: [AuthGuard],
    children: [
      {path: 'find', component: FindCarComponent},
      {path: 'searchFilters', component: SearchFiltersComponent},
      {path: 'searchPrice', component: SearchPriceComponent},
      {path: 'searchMap', component: SearchMapComponent},
      {path: 'addCar', component: AddCarComponent},
      {path: 'carDetails', component: CarDetailsComponent}
    ]}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
