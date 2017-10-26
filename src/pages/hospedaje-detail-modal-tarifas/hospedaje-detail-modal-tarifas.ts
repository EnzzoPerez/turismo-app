import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HospedajeDetailModalTarifasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
 	selector: 'page-hospedaje-detail-modal-tarifas',
 	templateUrl: 'hospedaje-detail-modal-tarifas.html',
})
export class HospedajeDetailModalTarifasPage {

	tarifa: any;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private viewCtrl: ViewController
	) {
		this.tarifa = this.navParams.get('tarifas');
	}

	ionViewDidLoad() {

	}

	closeModal() {
        this.viewCtrl.dismiss();
    }

}
