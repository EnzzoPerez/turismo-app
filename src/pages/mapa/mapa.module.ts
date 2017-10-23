import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MapaPage } from './mapa';
import { GoogleMapModule } from './../../components/google-map/google-map.module';


@NgModule({
    declarations: [
        MapaPage,
    ],
    imports: [
        IonicPageModule.forChild(MapaPage),
        GoogleMapModule
    ],
})
export class MapaPageModule { }
