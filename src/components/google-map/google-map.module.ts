import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { GoogleMapComponent } from "./google-map";


@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(GoogleMapComponent)
  ],
  declarations: [
    GoogleMapComponent
  ],
  exports: [GoogleMapComponent]
})
export class GoogleMapModule {}