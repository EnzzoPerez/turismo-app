import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeptoDetailPage } from './../depto-detail/depto-detail'
import { InfoCatProvider } from './../../providers/sgtur/infoCat';

@IonicPage()
@Component({
	selector: 'page-sobre-catamarca',
	templateUrl: 'sobre-catamarca.html',
})
export class SobreCatamarcaPage {
	deptos = [];
	deptosFilter = [];

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private infoCat: InfoCatProvider) {
    }

    ionViewDidLoad() {
        this.listDeptos();
    }

    listDeptos(){
      	this.infoCat.getDeptosList().subscribe( data => {
			this.deptos = data['results'];
			this.deptosFilter = data['results'];
		}, 
		error => console.log(error));
	}

	getDeptoDetail(depto: any){
		this.navCtrl.push(DeptoDetailPage, {depto: depto});
	}
	
	searchDeptos(event: any){
		let search = event.target.value.toLowerCase();
		function searchFilter(element: any, index: any, array: any) {
            return ((element.nombre.toLowerCase().includes(search)));
        }
        if (search.trim() === '' || search.trim().length < 2) {
            this.deptosFilter = this.deptos;
        } else {
            this.deptosFilter = this.deptos.filter(searchFilter);
        }
	}
}
