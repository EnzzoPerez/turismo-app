import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoiDetailPage } from './poi-detail';


@NgModule({
  declarations: [
    PoiDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PoiDetailPage),
  ],
})
export class PoiDetailPageModule {}
