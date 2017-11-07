import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SobreCatamarcaPage } from './sobre-catamarca';
import { DeptoDetailPageModule } from './depto-detail/depto-detail.module'


@NgModule({
	declarations: [
		SobreCatamarcaPage,
	],
	imports: [
		IonicPageModule.forChild(SobreCatamarcaPage),
		DeptoDetailPageModule
	],
})
export class SobreCatamarcaPageModule {}
