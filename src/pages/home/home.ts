import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { CategoriesPage } from '../categories/categories';
import { MapaPage } from '../mapa/mapa';
import { BusquedaPage } from '../busqueda/busqueda';
import { SobreCatamarcaPage } from '../sobre-catamarca/sobre-catamarca';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    items: any;
    @ViewChild(Slides) slides: Slides;

    constructor(public navCtrl: NavController) {
        this.items = [
            { titulo:'mapa', subtitulo: 'Encontra lo que buscas cerca de tí', color: '#3276b1', icon:'assets/images/icono-mapa.png', component:MapaPage, },
            { titulo:'atractivos', subtitulo: 'Descubrí Catamarca', color: '#5cb85c', icon:'assets/images/icono-turista.png', component:CategoriesPage},
            //{ titulo:'busqueda', subtitulo: 'Que estas buscando ?', color: '#f0ad4e', icon:'assets/images/icono-buscar.png', component:BusquedaPage },
            { titulo:'catamarca', subtitulo: 'Acerca de Catamarca', color: '#d9534f', icon:'assets/images/icono-historia.png', component:SobreCatamarcaPage },
        ]
    }

    itemSelected(item: any) {
        this.navCtrl.push(item.component);
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
