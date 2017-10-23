import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { GoogleMapComponent } from './../../components/google-map/google-map';


@IonicPage()
@Component({
    selector: 'page-mapa',
    templateUrl: 'mapa.html',
})
export class MapaPage {

    @ViewChild(GoogleMapComponent) public map: GoogleMapComponent;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private platform: Platform,) {
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.map.resizeMap();
            //this.map.myLocationSet();
            this.map.myLocationWatch();
        });
    }

}
