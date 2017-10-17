import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

    constructor(public navCtrl: NavController) {
        this.items = [
            { nombre: 'mapa', component: MapaPage },
            { nombre: 'atractivos', component: CategoriesPage },
            { nombre: 'busqueda', component: BusquedaPage },
            { nombre: 'catamarca', component: SobreCatamarcaPage },
        ]
    }

    itemSelected(item: any) {
        this.navCtrl.push(item.component);
    }

}
