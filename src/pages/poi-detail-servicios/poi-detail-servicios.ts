import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';

import { SgturHospedajesProvider } from '../../providers/sgtur/hospedaje';


declare var _: any;

@IonicPage()
@Component({
    selector: 'page-poi-detail-servicios',
    templateUrl: 'poi-detail-servicios.html',
})
export class PoiDetailServiciosPage {
    data: any;
    hospedajes: any;
    search_hospedaje: any
    categoria_hospedajes: any;
    status_filter: any;
    loader: boolean;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private viewCtrl: ViewController,
        public alertCtrl: AlertController,
        private hospedajeProvider: SgturHospedajesProvider,
    ) {
        console.log(this.navParams.get('data'));
        this.data = this.navParams.get('data');
        this.loader = true;

    }

    ionViewDidLoad() {
        let coord = this.data.ubicacion.coordinates;
        this.hospedajeProvider.list(false, coord[0], coord[1]).subscribe(
            data => {
                this.hospedajes = data.results;
                this.search_hospedaje = this.hospedajes;
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
        console.log(hospedaje);
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
