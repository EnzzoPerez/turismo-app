import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HospedajeDetailModalServiciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hospedaje-detail-modal-servicios',
  templateUrl: 'hospedaje-detail-modal-servicios.html',
})
export class HospedajeDetailModalServiciosPage {

	servicios: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private viewCtrl: ViewController
	) {
		this.servicios = this.navParams.get('servicios');
	}

	ionViewDidLoad() {
	
	}

	closeModal(){
        this.viewCtrl.dismiss();
    }
    
}
