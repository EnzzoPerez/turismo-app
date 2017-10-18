import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'page-poi-detail',
    templateUrl: 'poi-detail.html',
})
export class PoiDetailPage {

    POI: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.POI = this.navParams.get('poi');
    }

    ionViewDidLoad() {
        //
    }

}
