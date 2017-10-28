import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { CategoriesPage } from '../categories/categories';
import { MapaPage } from '../mapa/mapa';
import { BusquedaPage } from '../busqueda/busqueda';
import { SobreCatamarcaPage } from '../sobre-catamarca/sobre-catamarca';
import { CoreProvider } from './../../providers/core/core';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    items: any;
    @ViewChild(Slides) slides: Slides;

    constructor(
        public navCtrl: NavController,
        private coreService: CoreProvider
    ){
        this.items = [
            { titulo:'mapa', subtitulo: 'Encontra lo que buscas cerca de tí', component:MapaPage, image: 'assets/images/card-1.jpg'},
            { titulo:'atractivos', subtitulo: 'Descubrí Catamarca', component:CategoriesPage, image: 'assets/images/card-3.jpg'},
            { titulo:'catamarca', subtitulo: 'Acerca de Catamarca', component:SobreCatamarcaPage, image: 'assets/images/card-2.jpg' },
            { titulo:'sitio web', subtitulo: 'Visita nuestro sitio web', component:false, image: 'assets/images/card-4.jpg', url: 'www.turismo.catamarca.gob.ar/' }
        ]
    }

    itemSelected(item: any) {
        if (item.component){
            this.navCtrl.push(item.component);    
        }else{
            this.coreService.openLink(item.url, 'web')
        }
    }

    changeBackground(img: string): any {
        return { 'background': 'url('+ img +') center no-repeat'};
    }

    slideChanged() {
        this.slides.startAutoplay();
    }

    ionViewDidEnter() {
        if(this.slides) {
            this.slides.startAutoplay();
        }
    }

}
