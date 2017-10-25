import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
    categoria_hospedajes: any;
    loader: boolean;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        private viewCtrl: ViewController,
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
                let clase_hotel = {};
                let tmp_clase_hotel = _.groupBy(data.results, 'clase.nombre');

                // Eliminación de espacio en la key.
                _.forEach(tmp_clase_hotel, function(value, key) {
                    clase_hotel[key.split(' ').join('_').toLowerCase()] = {
                        'value': value,
                        'title': key,
                        'count': value.length,
                    }
                });

                this.hospedajes = clase_hotel;
                this.categoria_hospedajes = _.orderBy(_.keys(this.hospedajes));
                this.loader = false;
            },
            error => console.log(error),
        )
        
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    goToListHospedajeCategoria(hospedaje: any){
        console.log(hospedaje);
    }

}
