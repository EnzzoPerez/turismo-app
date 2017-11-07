import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { POIDetailPage } from './detail';
import { ModalServiciosPageModule } from './../../../components/modal-servicios/modal-servicios.module';
import { ModalDetailPageModule } from './../../../components/modal-detail/modal-detail.module';


@NgModule({
	declarations: [
		POIDetailPage,
	],
	imports: [
		IonicPageModule.forChild(POIDetailPage),
		ModalServiciosPageModule,
		ModalDetailPageModule
	],
})
export class POIDetailPageModule {}
