import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CoreProvider } from './../../providers/core/core'
import { PoiDetailModalDescPage } from './../poi-detail-modal-desc/poi-detail-modal-desc';


@IonicPage()
@Component({
    selector: 'page-poi-detail',
    templateUrl: 'poi-detail.html',
})
export class PoiDetailPage {

    POI: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        private modalCtrl: ModalController,
        private coreService: CoreProvider
    ) {
        this.POI = this.navParams.get('poi');
    }

    ionViewDidLoad() {
        //
    }

    openModal(type: string, data: any) {
        let modal = null;
        if (type == "detalle"){
            modal = this.modalCtrl.create(PoiDetailModalDescPage, { titulo: data.titulo, detalle: data.descripcion });
        }
        modal.present();
    }

    openTel(text: string){
        let newText = text.replace(';','');
        newText = newText.replace('(','');
        newText = newText.replace(')','');
        newText = newText.replace(' ','');        
        this.coreService.openLink(newText, 'tel');
    }

}
