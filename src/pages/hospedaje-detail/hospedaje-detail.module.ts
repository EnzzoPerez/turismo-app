import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospedajeDetailPage } from './hospedaje-detail';

import { HospedajeDetailModalServiciosPageModule } from './../hospedaje-detail-modal-servicios/hospedaje-detail-modal-servicios.module';
import { HospedajeDetailModalTarifasPageModule } from './../hospedaje-detail-modal-tarifas/hospedaje-detail-modal-tarifas.module';


@NgModule({
  declarations: [
    HospedajeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(HospedajeDetailPage),
    HospedajeDetailModalServiciosPageModule,
    HospedajeDetailModalTarifasPageModule
  ],
})
export class HospedajeDetailPageModule {}
