import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { AndroidPermissions } from '@ionic-native/android-permissions';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
//import { CoreProvider } from './../providers/core/core';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{ title: string, component: any , icon: string}>;

    constructor(
        public platform: Platform, 
        public statusBar: StatusBar,
        public splashScreen: SplashScreen, 
        private menuCtrl: MenuController,
        //private androidPermissions: AndroidPermissions,
        //private coreService: CoreProvider
    ){
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Inicio', component: HomePage, icon: 'home' },
            { title: 'Contacto', component: AboutPage, icon: 'ios-help-circle-outline' }
        ];

    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.checkPermissions();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.component){
            if(page.component == AboutPage){
                this.nav.push(page.component, {title: page.name});
            }else{
                this.nav.setRoot(page.component);
            }
            this.menuCtrl.close();
        }
    }

    checkPermissions(){
        /*this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
            success => this.coreService.showAlert('test', 'success'),
            err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
        );*/
    }
}
