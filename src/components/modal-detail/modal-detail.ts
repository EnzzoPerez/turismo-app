import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
    selector: 'modal-detail',
    templateUrl: 'modal-detail.html',
})
export class ModalDetailPage {

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
