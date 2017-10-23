import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoiDetailModalDescPage } from './poi-detail-modal-desc';

@NgModule({
  declarations: [
    PoiDetailModalDescPage,
  ],
  imports: [
    IonicPageModule.forChild(PoiDetailModalDescPage),
  ],
})
export class PoiDetailModalDescPageModule {}
