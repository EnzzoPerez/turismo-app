import { NgModule } from '@angular/core';

import { POIDetailPageModule } from './detail/detail.module';
import { POIListPageModule } from './list/list.module';


@NgModule({
	declarations: [
	],
	imports: [
		POIListPageModule,
		POIDetailPageModule
	]
})
export class PoiModule {}
