import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { CoreProvider } from './../../../providers/core/core'
import { HospedajeModalServiciosPage } from './modal-servicios/modal-servicios';
import { HospedajeModalTarifasPage } from './modal-tarifas/modal-tarifas';


@IonicPage({ segment: "hospedaje-detail" })
@Component({
    selector: 'hospedaje-detail',
    templateUrl: 'detail.html',
})
export class HospedajeDetailPage {

	hospedaje: any;
	coord: any[] = [0, 1];

 	constructor(
  		public navCtrl: NavController, 
  		public navParams: NavParams,
  		private coreService: CoreProvider,
  		private modalCtrl: ModalController
  	){
 		this.hospedaje = this.navParams.get('hospedaje');
 		if (this.navParams.get('coord') && this.navParams.get('coord').coordinates) {
 			this.coord[0] = this.navParams.get('coord').coordinates[1]
 			this.coord[1] = this.navParams.get('coord').coordinates[0]
 		}else{
 			this.coord = this.navParams.get('coord');
 		}
 		//console.log(this.coord);
  	}

  	ionViewDidLoad() {
    	//console.log('ionViewDidLoad HospedajeDetailPage');
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
            modal = this.modalCtrl.create(HospedajeModalTarifasPage, { tarifas: data });
        }else if (type == "servicio"){
            modal = this.modalCtrl.create(HospedajeModalServiciosPage, { servicios: data });
        }
        modal.present();
    }

}
