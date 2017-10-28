import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CoreProvider } from './../../providers/core/core'
import { PoiDetailModalDescPage } from './../poi-detail-modal-desc/poi-detail-modal-desc';
import { PoiDetailServiciosPage } from './../poi-detail-servicios/poi-detail-servicios';


@IonicPage()
@Component({
    selector: 'page-poi-detail',
    templateUrl: 'poi-detail.html',
})
export class PoiDetailPage {

    POI: any;
    coord: any[] = [0, 1];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        private modalCtrl: ModalController,
        private coreService: CoreProvider
    ) {
        this.POI = this.navParams.get('poi');
        if (this.POI.ubicacion && this.POI.ubicacion.coordinates) {
            this.coord[0] = this.POI.ubicacion.coordinates[1]
            this.coord[1] = this.POI.ubicacion.coordinates[0]
        }
        else if (this.navParams.get('coord')){
            this.coord = this.navParams.get('coord');
        }
        //console.log(this.POI);
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

    goToListServices(data: any){
        this.navCtrl.push(PoiDetailServiciosPage, {'data': data})
    }

    openTel(text: string){
        let newText = text.replace(';','');
        newText = newText.replace('(','');
        newText = newText.replace(')','');
        newText = newText.replace(' ','');        
        this.coreService.openLink(newText, 'tel');
    }

    openNavigation() {
        this.coreService.openLink(this.coord, 'geo');
    }

}
