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

    constructor(public navCtrl: NavController, public navParams: NavParams, private sgturPOIProvider: SgturPOIProvider) {
        this.categoryName = this.navParams.get('nombre');
    }

    ionViewDidLoad() {
        this.sgturPOIProvider.getPOIByCategory(this.navParams.get('nombre')).subscribe(
            data => {
                this.POIList = data['results']
                console.log(this.POIList);
            },
            error => {
                console.log(error);
            }
        );
    }

    goToPOIDetail(poi: any){
        this.navCtrl.push(PoiDetailPage, {poi: poi})
    }

}
