import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController, Platform, NavParams, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Device } from '@ionic-native/device';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/takeUntil';

import { CoreProvider } from './../../providers/core/core';


declare var google: any;


@Component({
    selector: 'google-map',
    templateUrl: 'google-map.html',
})
export class GoogleMapComponent {
    @ViewChild('map') mapElement: ElementRef;

    // MAP CONFIG
    @Input('zoom') public zoom: number = 14;
    @Input('lat') public latitude: number = -28.468452;
    @Input('lng') public longitude: number = -65.779094;
    @Input('height_map') public height_map;

    // INITIAL VARS
    map: any;
    layers: any[] = [];
    circles: any[] = [];
    polyline: any;
    myPositionMarker: any;
    originRouteLatLng: any;
    destRouteLatLng: any;
    destRouteLatLngGlobal: any;
    infowindow: any;
    watchPosition: any;
    private watchPositionSub: Subscription = new Subscription();

    // ESTILOS
    mapPopupBtnGroupStyle = "margin-top: 10px !important;text-align: center !important;";
    mapPopupBtnStyle = "border: 1px solid rgba(25, 27, 17, 0.29) !important;margin-right: 5px !important;padding: 10px !important;cursor: pointer !important;color: #FFF !important;background: #009bff;text-shadow: 1px 1px grey;";

    constructor(
        public platform: Platform,
        public navCtrl: NavController,
        public navParams: NavParams,
        private geolocation: Geolocation,
        private diagnostic: Diagnostic,
        private alertCtrl: AlertController,
        private device: Device,
        private coreService: CoreProvider
    ) {
        platform.ready().then(() => {
            //this.initMap();
        });
        this.myPositionMarker = null;
    }

    ngAfterViewInit() {
       // this.resizeMap();
    }

    initMap() {
        console.log(this.zoom);
        let mapEle = this.mapElement.nativeElement;
        let latLng = new google.maps.LatLng(this.latitude, this.longitude);

        this.map = new google.maps.Map(mapEle, {
            center: latLng,
            zoom: this.zoom
        });

        google.maps.event.addListenerOnce(this.map, 'idle', () => {
            mapEle.classList.add('show-map');
        });

        this.infowindow = new google.maps.InfoWindow();

        this.map.addListener('click', () => {
           this.closeInfoWindow();
        });

        this.resizeMap();
    }

    resizeMap(): void {
        google.maps.event.trigger(this.map, 'resize');
    }

    setCenter(latitude: number = this.latitude, longitude: number = this.longitude): void {
        let latLng = new google.maps.LatLng(latitude, longitude);
        this.map.setCenter(latLng);
    }

    setBounds(layer: any, route:boolean=false): void {
        let bounds = new google.maps.LatLngBounds();
        let total: number = 0;
        if(route){
            bounds.extend(this.originRouteLatLng);
            bounds.extend(this.destRouteLatLng);
        }else{ 
            this.layers[layer].forEach(feature => {
                feature.getGeometry().forEachLatLng(latlng => {
                    bounds.extend(latlng);
                })
                total++;
            });
        }
        if (total > 0){
            this.map.fitBounds(bounds);
        }
    }

    prepareRoute(layer: string, latLng?: any){
        if(latLng){
            this.destRouteLatLng = new google.maps.LatLng(latLng[0], latLng[1]);;
        }
        this.coreService.presentLoading('Cargando Ruta...');
        if(this.myPositionMarker){
            this.coreService.dismissLoading();
            this.originRouteLatLng = this.myPositionMarker.position;
            this.setRoute(this.originRouteLatLng, this.destRouteLatLng);          
        }else{
            this.coreService.dismissLoading();
            this.coreService.showAlert('Falta Origen', 'Cargue su posición de origen y vuelva a intentar.');
        }
    }

    setRoute(origin: any, destination:any){
        if (this.polyline){
            this.polyline.setMap(null);
        }
        //Initialize the Path Array
        var path = new google.maps.MVCArray();
        //Initialize the Direction Service
        var service = new google.maps.DirectionsService();
        //Set the Path Stroke Color
        this.polyline = new google.maps.Polyline({ 
            strokeColor: '#4986E7',
            strokeOpacity: 1.0,
            strokeWeight: 3
        });
        this.polyline.setMap(this.map);
        var lat_lng = new Array();
        lat_lng.push(origin);
        lat_lng.push(destination);
        //Loop and Draw Path Route between the Points on MAP
        for (var i = 0; i < lat_lng.length; i++) {
            if ((i + 1) < lat_lng.length) {
                var src = lat_lng[i];
                var des = lat_lng[i + 1];
                path.push(src);
                this.polyline.setPath(path);
                service.route({
                    origin: src,
                    destination: des,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (result: any, status: any) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                            path.push(result.routes[0].overview_path[i]);
                        }
                    }
                });
            }
        }
        this.setBounds(this.polyline, true);
    }

    removeRoute(){
        if (this.polyline){
            this.polyline.setMap(null);
        }
    }

    setMarkerOnClick(layer:string){
         this.layers[layer].addListener('click', (event: any) => {
            // Obtenemos todas las propiedades del objeto
            let json = JSON.stringify(event.feature.f);
            let latLong: any;

            event.feature.getGeometry().forEachLatLng((latlng: any) => {
                latLong = JSON.stringify([latlng.lat(), latlng.lng()]);
            });

            let div = 
            "<div class='infowindow-popup' data-properties='"+ json +"' data-point='"+ latLong +"' data-layer='"+ layer +"'>" +
                "<div class='infowindow-group'>" +
                    "<button class='infowindow-btn btn-detalle'>Detalle</button>" +
                    "<button class='infowindow-btn btn-ruta'>Ruta</button>" +
                    "<button class='infowindow-btn btn-navegador'>Navegador</button>" +
                "</div>"+
            "</div>";
            this.infowindow.setContent("<div style='width:150px; text-align: center;'>"+ div +"</div>");
            this.infowindow.setPosition(event.feature.getGeometry().get());
            this.infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
            this.infowindow.open(this.map);
        });
    }

    closeInfoWindow(){
        this.infowindow.close();
    }

    setHeightMap(height: number): void {
        this.height_map = height;
    }

    createLayer(layer: string){
        this.layers[layer] = new google.maps.Data();
        this.layers[layer].setMap(this.map);
    }

    hiddenLayer(layer?: string) {
        if (layer){
            if(this.layers[layer]){
                this.layers[layer].setMap(null);
            }
        }else{
            // eliminar todos
        }
        
    }

    addGeoJson(layer: string, json: any){
        this.layers[layer].addGeoJson(json);
    }

    addOnClick(layer: string){
        this.layers[layer].addListener('click', event => {
            // TODO ON CLICK
        });  
    }

    addFeature(layer: string, json: any) {
        this.layers[layer].addFeature(json);
    }

    removeFeatureByPk(layer: string, feature: any) {
        this.layers[layer].forEach((f: any) => {
            if(f.getProperty('pk') == feature.properties.pk){
                this.layers[layer].remove(f);
            }
        });
    }

    getMyLocation() {
        if(this.myPositionMarker){
            return this.myPositionMarker.getPosition();
        }else{
            return false
        }
    }
    
    setStyles(layer: string, params: any){
        // FUNCION A MEJORAR - DEBERIA PASARLE TODO EL JSON DE ESTYLOS POR PARAMETRO.
        let labelText: string;
        function getProperty(feature: any){
            let i = 0;
            params['prop'].forEach(property => {
                if(i >= 1){
                    labelText = labelText[property];
                }else{
                    labelText = feature.getProperty(property);
                }
                i = i + 1;
            });
        }
        
        this.layers[layer].setStyle(feature => {
            if(params.prop){
                getProperty(feature);
            }
            return /** @type {google.maps.Data.StyleOptions} */({
                icon: {
                    url: params.icon,
                    labelOrigin: new google.maps.Point(20, -10)
                }
            });
        });
    }

    createCircle(latLng: any, radio: number, nombre: string) {
        this.circles[nombre] = new google.maps.Circle({
            strokeColor: '#80d7ff',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#b3e7ff',
            fillOpacity: 0.35,
            map: this.map,
            center: latLng,
            radius: radio
        });
    }

    removeCircle(nombre: string){
        if (this.circles[nombre]){
            this.circles[nombre].setMap(null);;
        }
    }

    presentConfirmGPS(title: string, message: string) {
        let alert = this.alertCtrl.create({
            title: title,
            message: message,
            buttons: [
                {
                    text: 'Ahora no',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                        this.coreService.dismissLoading();
                    }
                },
                {
                    text: 'Activar GPS',
                    handler: () => {
                        this.diagnostic.switchToLocationSettings();
                    }
                }
                ]
            });
        alert.present();
    }

    createPositionMarker(latLng: any) {
        if(!this.myPositionMarker && latLng){
            this.myPositionMarker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                title: 'Estoy aquí!',
                icon: 'assets/images/my_position.png'
            });
        }else{
            this.myPositionMarker = new google.maps.Marker({
                position: this.map.getCenter(),
                map: this.map,
                title: 'For test!',
                icon: 'assets/images/my_position.png'
            });
        }
    }

    myLocationSet(center?:boolean){
        if(center && this.myPositionMarker){
            this.coreService.presentLoading('Cargando su ubicación...');
            this.setCenter(this.myPositionMarker.getPosition().lat(), this.myPositionMarker.getPosition().lng());
            this.coreService.dismissLoading();
        }else{
            if(center){this.coreService.presentLoading('Cargando su ubicación...')}
           
            // Obtenemos el modo de Ubicación
            this.diagnostic.getLocationMode().then(mode => {
                // Si el GPS no esta en modo de alta precisión
                if(mode != this.diagnostic.locationMode.HIGH_ACCURACY){
                    this.presentConfirmGPS('Activar GPS', 'Por favor active su GPS en modo alta precisión.');
                }else{
                    // Obtenemos la ubicación actual
                    this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((data) => {
                        let latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
                        // Creamos el marcador de mi posición si este no existe.
                        this.createPositionMarker(latLng);
                        // Movemos el marcador de nuestra posición a la nueva posición.
                        this.myPositionMarker.setPosition(latLng);
                        // Centramos el mapa en la nueva posición.
                        if(center){this.map.setCenter(latLng)}
                        // Cerramos el modal con el mensaje "Cargando".
                        this.coreService.dismissLoading();
                    }).catch((error) => {
                        console.log(error);
                        // Cerramos el modal con el mensaje "Cargando".
                        this.coreService.dismissLoading();
                        // Error log
                        // this.coreService.showAlert('Error GPS', JSON.stringify(error));
                    });
                }
             }).catch(error => {
                console.log(error);
            });
        }
    }

    myLocationWatch(){
        // Obtenemos el modo de Ubicación
        this.diagnostic.getLocationMode().then(mode => {
            // Si el GPS esta en modo de alta precisión
            if(mode == this.diagnostic.locationMode.HIGH_ACCURACY) {
                // Susbribimos al metodo watchPosition para recibir ubicación en tiempo real.
                this.watchPosition = this.geolocation.watchPosition({enableHighAccuracy: true});
                this.watchPositionSub.add(this.watchPosition.subscribe((data) => {
                    this.watchPosition = this.geolocation.watchPosition({enableHighAccuracy: true});
                    let latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
                    if (this.myPositionMarker){
                        this.myPositionMarker.setPosition(latLng);
                    }else{
                        this.myLocationSet(true);
                    }
                }));
            } 
        });
        // Susbribimos al metodo que va a actuar cuando se encienda o apague el GPS.
        this.diagnostic.registerLocationStateChangeHandler(state => {
            if((this.device.platform === "Android" && state !== this.diagnostic.locationMode.LOCATION_OFF)
                || (this.device.platform === "iOS") && ( state === this.diagnostic.permissionStatus.GRANTED
                    || state === this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE
            )){
                // Susbribimos al metodo watchPosition para recibir ubicación en tiempo real.
                this.watchPosition = this.geolocation.watchPosition({enableHighAccuracy: true});
                this.watchPositionSub.add(this.watchPosition.subscribe((data) => {
                    let latLng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
                    if (this.myPositionMarker){
                        this.myPositionMarker.setPosition(latLng);
                    }else{
                        this.myLocationSet();
                    }
                }));
            }else{
                // Cancelamos suscripción de watchPosition
                this.myLocationWatchUnsubscribe();
            }
        });
        
    }

    myLocationWatchUnsubscribe(){
        if(this.watchPositionSub){
            this.watchPositionSub.unsubscribe();
        }
    }

}

