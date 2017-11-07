import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospedajeModalServiciosPage } from './modal-servicios';

@NgModule({
	declarations: [
		HospedajeModalServiciosPage,
	],
	imports: [
		IonicPageModule.forChild(HospedajeModalServiciosPage),
	],
})
export class ModalServiciosPageModule {}
