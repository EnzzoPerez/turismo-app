import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController, AlertController } from 'ionic-angular';

import { GoogleMapComponent } from './../../components/google-map/google-map';
import { CoreProvider } from './../../providers/core/core';
import { SgturPOIProvider } from './../../providers/sgtur/poi'
import { SgturHospedajesProvider } from './../../providers/sgtur/hospedaje'

import * as $ from 'jquery'


@IonicPage()
@Component({
    selector: 'page-mapa',
    templateUrl: 'mapa.html',
})
export class MapaPage {

    @ViewChild(GoogleMapComponent) public map: GoogleMapComponent;
    layer: any;
    radio: number = 1;

    // Filter Map
    testCheckboxOpen: boolean;
  	filters: {poi: boolean, hospedaje: boolean, comercio: boolean, cajero: boolean}


    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private platform: Platform,
        public menuCtrl: MenuController,
        private coreService: CoreProvider,
        private poiService: SgturPOIProvider,
        private hospedajeService: SgturHospedajesProvider,
        public alertCtrl: AlertController
    ) {
    	this.filters = {poi: true, hospedaje: false, comercio: false, cajero: false};

        $(document).on("click", '#search-float-button', () => {
			$('#button-wrapper').show();
			this.radioChange();
		});

		$(document).on("click", '#close-button', () => {
			$('#button-wrapper').hide();
		});
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.map.resizeMap();
            this.map.myLocationWatch();
            // COMENTAR PARA PRODUCCION
            //this.map.createPositionMarker(false);
        });
    }

    ionViewDidEnter() {
        this.menuCtrl.swipeEnable(true);
    }


    myLocationSet(center?:boolean){
        this.map.myLocationSet(true);
    }

    centerPosition() {
		this.map.myLocationSet(true);
    }
    
    radioChange() {
		let latLng = this.map.getMyLocation();
		if (latLng){
			this.map.removeCircle('myPosition');
			this.map.createCircle(latLng, this.radio * 1000, 'myPosition');
		}
	}

	searchByFilter(latLng: any) {

		var iconPOI = 'assets/images/marker.png';
		var iconHospedaje = 'assets/images/marker2.png';
		var iconComercio = 'assets/images/marker3.png';
		var iconCajero = 'assets/images/marker4.png';

		if(this.filters.poi){
			this.poiService.getRadioPOI(latLng.lng() + ',' + latLng.lat(), this.radio * 1000).subscribe (
				data => {
					this.map.hiddenLayer('poi');
					this.map.createLayer('poi');
					this.map.addGeoJson('poi', data['results']);
					this.map.setStyles('poi', {icon:iconPOI});
					this.map.setBounds('poi');
        			this.map.setMarkerOnClick('poi');
					this.coreService.dismissLoading();
				},
				error => {
					this.coreService.dismissLoading();
				}
			);
		}

		if(this.filters.hospedaje){
			this.hospedajeService.getRadioHospedajes(latLng.lng() + ',' + latLng.lat(), this.radio * 1000).subscribe (
				data => {
					console.log(data['results']);
					this.map.hiddenLayer('hospedajes');
					this.map.createLayer('hospedajes');
					this.map.addGeoJson('hospedajes', data['results']);
					this.map.setStyles('hospedajes', {icon:iconHospedaje});
					this.map.setBounds('hospedajes');
        			this.map.setMarkerOnClick('hospedajes');
					this.coreService.dismissLoading();
				},
				error => {
					this.coreService.dismissLoading();
				}
			);
		}

		if(this.filters.comercio){
			
		}

		if(this.filters.cajero){
			
		}

	}

	radioSearch() {

		let latLng = this.map.getMyLocation();

		if (latLng){
			this.coreService.presentLoading('Buscando..');
			this.searchByFilter(latLng);
		}else{
			this.coreService.showAlert('Error', 'No pudimos encontrar su ubicación!')
			// FOR TESTING - NO BORRAR >>>>
			/*this.globalService.presentLoading('Buscando hospedajes test..');
			this.hospedajeService.getRadioHospedajes('-65.779013,-28.469211', this.radio).subscribe ( 
				data => {
					this.map.myLocationSet(false,'-28.469211','-65.779013');
					this.map.clearLayer('hospedajes');
					this.map.addGeoJson('hospedajes', data);
					this.map.setIcons('hospedajes', icon1);
					this.map.setLabel('hospedajes', 'hospedajedata', 'hospedaje', 'nombre');
					console.log(data);
					this.globalService.dismissLoading();
					this.map.setCenter(true);
				},
				error => {
					this.globalService.dismissLoading();
				}
			);
			this.coreService.showAlert('Error', 'No pudimos encontrar su ubicación');*/
		}
  	}

  	showFilterbox() {
	    let alert = this.alertCtrl.create();
	    alert.setTitle('Qué deseas buscar?');

	    alert.addInput({
	      type: 'checkbox',
	      label: 'Puntos de Interes',
	      value: 'poi',
	      checked: this.filters.poi?true:false
	    });

	    alert.addInput({
	      type: 'checkbox',
	      label: 'Hospedajes',
	      value: 'hospedaje',
	      checked: this.filters.hospedaje?true:false
	    });

	    alert.addInput({
	      type: 'checkbox',
	      label: 'Comercios',
	      value: 'comercio',
	      checked: this.filters.comercio?true:false
	    });

	    alert.addInput({
	      type: 'checkbox',
	      label: 'Cajeros',
	      value: 'cajero',
	      checked: this.filters.cajero?true:false
	    });

	    alert.addButton('Cancelar');
	    alert.addButton({
	      text: 'Aceptar',
	      handler: data => {
	        this.testCheckboxOpen = false;
	        this.filters.poi = data.includes("poi")?true:false;
	        this.filters.hospedaje = data.includes("hospedaje")?true:false;
	        this.filters.comercio = data.includes("comercio")?true:false;
	        this.filters.cajero = data.includes("cajero")?true:false;
	      }
	    });
	    alert.present().then(() => {
	      this.testCheckboxOpen = true;
	    });
	}

    ngOnDestroy() {
        this.map.myLocationWatchUnsubscribe();
    }

}
