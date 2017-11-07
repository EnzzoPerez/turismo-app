import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import * as _ from "lodash";

import { SgturHospedajesProvider } from './../../providers/sgtur/hospedaje';
import { HospedajeDetailPage } from './../../pages/hospedaje/detail/detail';


@Component({
    selector: 'modal-servicios',
    templateUrl: 'modal-servicios.html',
})
export class ModalServiciosPage {
    data: any;
    hospedajes: any;
    search_hospedaje: any;
    categoria_hospedajes: any;
    status_filter: any;
    loader: boolean;
    coord: any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private viewCtrl: ViewController,
        public alertCtrl: AlertController,
        private hospedajeProvider: SgturHospedajesProvider,
    ) {
        console.log(this.navParams.get('data'));
        this.data = this.navParams.get('data');
        this.coord = this.navParams.get('coord');
        this.loader = true;

    }

    ionViewDidLoad() {
        this.hospedajeProvider.list(false, this.coord[1], this.coord[0]).subscribe(
            data => {
                this.hospedajes = data.results;
                this.search_hospedaje = this.hospedajes;
                console.log(this.hospedajes);
                this.loader = false;

                // Group by hospedaje.clase.nombre
                this.categoria_hospedajes = _.keys(_.groupBy(this.hospedajes, 'clase.nombre'));
                this.setStatusFilter();
            },
            error => console.log(error),
        )
        
    }

    setStatusFilter(){
        this.status_filter = {};
        _.forEach(this.categoria_hospedajes, element => {
            this.status_filter[element.split(' ').join('_').toLowerCase()] = false
        })
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    goToListHospedajeCategoria(hospedaje: any){
        this.navCtrl.push(HospedajeDetailPage, { hospedaje: hospedaje, coord: hospedaje.ubicacion });
    }

    showFilterbox(){
        let alert = this.alertCtrl.create();
        alert.setTitle('Categoría Alojamientos');

        _.forEach(this.categoria_hospedajes, element => {
            alert.addInput({
                type: 'checkbox',
                label: element,
                value: element,
                checked: this.status_filter[element.split(' ').join('_').toLowerCase()]?true: false
            })
        });

        alert.addButton('Cancelar');
        alert.addButton({
            text: 'Aceptar',
            handler: data => {
                // Find elements by selection
                this.search_hospedaje = _.filter(this.hospedajes, element => {
                    return data.includes(element.clase.nombre)
                });
                console.log('Search Hospedajes: ', this.search_hospedaje);
            }
        });

        alert.present().then(() => {
            console.log(this.status_filter);
        });
    }

}
