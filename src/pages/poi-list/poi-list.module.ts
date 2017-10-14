import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PoiListPage } from './poi-list';

@NgModule({
  declarations: [
    PoiListPage,
  ],
  imports: [
    IonicPageModule.forChild(PoiListPage),
  ],
})
export class PoiListPageModule {}
