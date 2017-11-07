import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as _ from "lodash";

import { SgturPOIProvider } from '../../providers/sgtur/poi';
import { POIListPage } from '../poi/list/list';


@IonicPage()
@Component({
    selector: 'page-categories',
    templateUrl: 'categories.html',
})
export class CategoriesPage {

    categories: any;
    loader: boolean;
    noData: boolean;
    reloadBtn: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams, private sgturPOIProvider: SgturPOIProvider) {}

    loadPOI() {
        console.log('actualizar');
        this.loader = true;
        this.reloadBtn = false;
        this.noData = false;
        this.sgturPOIProvider.getPOICategories().subscribe(
            data => {
                // Filtramos para mostrar solo las categorías que contengan POIs
                this.categories = _.filter(data['results'], function(r){return r.poi_count > 0})
                this.loader = false;
                this.noData = false;
                this.reloadBtn = false;
            },
            error => {
                console.log(error);
                this.loader = false;
                this.noData = true;
                this.reloadBtn = true;
            }
        );
    }

    ionViewDidLoad() {
        this.loadPOI();
    }

    categorySelected(category) {
        this.navCtrl.push(POIListPage, {pk: category.pk, nombre: category.nombre});
    }

}
