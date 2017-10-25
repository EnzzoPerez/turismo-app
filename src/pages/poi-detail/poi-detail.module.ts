import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoiDetailPage } from './poi-detail';

import { PoiDetailServiciosPageModule } from '../poi-detail-servicios/poi-detail-servicios.module';

@NgModule({
  declarations: [
    PoiDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PoiDetailPage),
    PoiDetailServiciosPageModule,
  ],
})
export class PoiDetailPageModule {}
