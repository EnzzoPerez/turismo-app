import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CoreProvider } from './../../providers/core/core'


@IonicPage()
@Component({
    selector: 'page-about',
    templateUrl: 'about.html',
})
export class AboutPage {

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private coreService: CoreProvider
    ) {}

    ionViewDidLoad() {
        console.log('ionViewDidLoad AboutPage');
    }

    openTel(text: string){      
        this.coreService.openLink(text, 'tel');
    }

    openMail(text: string) {
        this.coreService.openLink(text, 'mail');
    }

    openWeb(text: string) {
        this.coreService.openLink(text, 'web');
    }

}
