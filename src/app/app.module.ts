import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {FormsModule} from '@angular/forms';
import {SystemModule} from './system/system.module';
import {Cloudinary, CloudinaryConfiguration, CloudinaryModule} from '@cloudinary/angular-5.x';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBZ9wGJSeKuaVXHJg3sKovhlZybGI7fW7A',
      libraries: ['places']
    }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule,
    SystemModule,
    CloudinaryModule.forRoot({Cloudinary}, {cloud_name: 'dp0qiqfyj'} as CloudinaryConfiguration)
  ],
  providers: [GoogleMapsAPIWrapper],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
