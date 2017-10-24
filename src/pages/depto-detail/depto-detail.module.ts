import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeptoDetailPage } from './depto-detail';

@NgModule({
  declarations: [
    DeptoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DeptoDetailPage),
  ],
})
export class DeptoDetailPageModule {}
