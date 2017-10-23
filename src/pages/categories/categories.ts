import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as _ from "lodash";

import { SgturPOIProvider } from '../../providers/sgtur/poi';
import { PoiListPage } from '../poi-list/poi-list';


@IonicPage()
@Component({
    selector: 'page-categories',
    templateUrl: 'categories.html',
})
export class CategoriesPage {

    categories: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private sgturPOIProvider: SgturPOIProvider) {
        
    }

    ionViewDidLoad() {
        this.sgturPOIProvider.getPOICategories().subscribe(
            data => {
                // Filtramos para mostrar solo las categorías que contengan POIs
                this.categories = _.filter(data['results'], function(r){return r.poi_count > 0})
                console.log(this.categories);
            },
            error => {
                console.log(error);
            }
        );
    }

    categorySelected(category) {
        this.navCtrl.push(PoiListPage, {pk: category.pk, nombre: category.nombre});
    }

}
