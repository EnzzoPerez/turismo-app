import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CoreProvider } from './../../providers/core/core'
import { HospedajeDetailModalServiciosPage } from './../hospedaje-detail-modal-servicios/hospedaje-detail-modal-servicios';
import { HospedajeDetailModalTarifasPage } from '../hospedaje-detail-modal-tarifas/hospedaje-detail-modal-tarifas';


@IonicPage()
@Component({
 	selector: 'page-hospedaje-detail',
 	templateUrl: 'hospedaje-detail.html',
})
export class HospedajeDetailPage {

	hospedaje: any;
	coord: any;

 	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		private coreService: CoreProvider,
  		private modalCtrl: ModalController
  	){
 		this.hospedaje = this.navParams.get('hospedaje');
 		this.coord = this.navParams.get('coord');
 		console.log(this.hospedaje);
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad HospedajeDetailPage');
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

    openModal(type: string, data: any) {
        let modal = null;
        if (type == "tarifa"){
            modal = this.modalCtrl.create(HospedajeDetailModalTarifasPage, { tarifas: data });
        }else if (type == "servicio"){
            modal = this.modalCtrl.create(HospedajeDetailModalServiciosPage, { servicios: data });
        }
        modal.present();
    }

}
