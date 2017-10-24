import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';

import { GoogleMapComponent } from './../../components/google-map/google-map';
import { CoreProvider } from './../../providers/core/core';

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

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private platform: Platform,
        public menuCtrl: MenuController,
        private coreService: CoreProvider
    ) {
        $(document).on("click", '#search-float-button', () => {
			$('#button-wrapper').show();
		});

		$(document).on("click", '#close-button', () => {
			$('#button-wrapper').hide();
		});
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.map.resizeMap();
            //this.map.myLocationSet();
            this.map.myLocationWatch();
        });
    }

    ionViewDidEnter() {
        this.menuCtrl.swipeEnable(true);
    }

    ngOnDestroy() {
        this.map.myLocationWatchUnsubscribe();
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
			//this.map.removeCircle('myPosition');
			//this.map.createCircle(latLng.lat, latLng.lng, this.radio, 'myPosition');
		}
	}

	radioSearch() {
	    /*var icon1 = Leaflet.icon({
            iconUrl: 'assets/images/marker.png',
            iconSize: [40,40]
		});*/
		
		/*let latLng = this.map.getMyLocation();
		if (latLng){
			this.globalService.presentLoading('Buscando hospedajes..');
			this.hospedajeService.getRadioHospedajes(latLng.lng + ',' + latLng.lat, this.radio).subscribe (
				data => {
					this.map.clearLayer('hospedajes');
					this.map.addGeoJson('hospedajes', data);
					this.map.setIcons('hospedajes', icon1);
					this.map.setLabel('hospedajes', 'hospedajedata', 'hospedaje', 'nombre');
					this.globalService.dismissLoading();
				},
				error => {
					this.globalService.dismissLoading();
				}
			);
		}else{
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
			this.coreService.showAlert('Error', 'No pudimos encontrar su ubicación');
		}*/
  	}

}
