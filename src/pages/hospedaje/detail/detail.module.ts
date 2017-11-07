import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospedajeDetailPage } from './detail';

import { ModalServiciosPageModule } from './modal-servicios/modal-servicios.module';
import { ModalTarifasPageModule } from './modal-tarifas/modal-tarifas.module';


@NgModule({
	declarations: [
		HospedajeDetailPage,
	],
	imports: [
		IonicPageModule.forChild(HospedajeDetailPage),
		ModalServiciosPageModule,
		ModalTarifasPageModule
	],
})
export class HospedajeDetailPageModule {}
