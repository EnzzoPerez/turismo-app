import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-poi-detail-modal-desc',
    templateUrl: 'poi-detail-modal-desc.html',
})
export class PoiDetailModalDescPage {

    detalle: string;
    titulo: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
        this.detalle = this.navParams.get('detalle');
        this.titulo = this.navParams.get('titulo');
    }

    ionViewDidLoad() {
        
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

}
