import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
                this.categories = data['results']
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
