import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SgturPOIProvider } from '../../providers/sgtur/poi';
import { PoiDetailPage } from './../poi-detail/poi-detail';


@IonicPage()
@Component({
    selector: 'page-poi-list',
    templateUrl: 'poi-list.html',
})
export class PoiListPage {

    categoryName: string;
    POIList: any;
    loader: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, private sgturPOIProvider: SgturPOIProvider) {
        this.categoryName = this.navParams.get('nombre');
        this.loader = true;
    }

    ionViewDidLoad() {
        this.sgturPOIProvider.getPOIByCategory(this.navParams.get('nombre')).subscribe(
            data => {
                this.POIList = data['results'];
                console.log(data['results']);
                this.loader = false;
            },
            error => {
                console.log(error);
                this.loader = false;
            }
        );
    }

    goToPOIDetail(poi: any){
        this.navCtrl.push(PoiDetailPage, {poi: poi})
    }

}
