import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoiMapPage } from './poi-map';

@NgModule({
  declarations: [
    PoiMapPage,
  ],
  imports: [
    IonicPageModule.forChild(PoiMapPage),
  ],
})
export class PoiMapPageModule {}
