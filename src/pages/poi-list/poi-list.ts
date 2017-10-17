import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SgturPOIProvider } from '../../providers/sgtur/poi';


@IonicPage()
@Component({
    selector: 'page-poi-list',
    templateUrl: 'poi-list.html',
})
export class PoiListPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private sgturPOIProvider: SgturPOIProvider) {
        
    }

    ionViewDidLoad() {
        console.log(this.navParams.get('nombre'));
    }

}
