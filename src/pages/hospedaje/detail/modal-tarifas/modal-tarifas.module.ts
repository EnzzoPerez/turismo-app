import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospedajeModalTarifasPage } from './modal-tarifas';

@NgModule({
	declarations: [
		HospedajeModalTarifasPage,
	],
	imports: [
		IonicPageModule.forChild(HospedajeModalTarifasPage),
	],
})
export class ModalTarifasPageModule {}
