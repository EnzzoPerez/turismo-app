import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { POIListPage } from './list';


@NgModule({
    declarations: [
        POIListPage,
    ],
    imports: [
        IonicPageModule.forChild(POIListPage),
    ],
})
export class POIListPageModule { }
