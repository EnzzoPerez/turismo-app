import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Device } from '@ionic-native/device';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PoiListPage } from '../pages/poi-list/poi-list';
import { PoiListPageModule } from '../pages/poi-list/poi-list.module';
import { CoreProvider } from '../providers/core/core';
import { AmauttaProvider } from '../providers/amautta/amautta';
import { SgturProvider } from '../providers/sgtur/sgtur';
import { AmauttaComerciosProvider } from '../providers/amautta/comercios';
import { SgturHospedajesProvider } from '../providers/sgtur/hospedaje';
import { SgturPOIProvider } from '../providers/sgtur/poi';
import { CategoriesPageModule } from '../pages/categories/categories.module';
import { DeptoDetailPage } from '../pages/depto-detail/depto-detail';
import { DeptoDetailPageModule } from '../pages/depto-detail/depto-detail.module';
import { CategoriesPage } from '../pages/categories/categories';
import { AboutPageModule } from '../pages/about/about.module';
import { AboutPage } from '../pages/about/about';
import { MapaPageModule } from '../pages/mapa/mapa.module';
import { MapaPage } from '../pages/mapa/mapa';
import { BusquedaPageModule } from '../pages/busqueda/busqueda.module';
import { BusquedaPage } from '../pages/busqueda/busqueda';
import { SobreCatamarcaPageModule } from '../pages/sobre-catamarca/sobre-catamarca.module';
import { SobreCatamarcaPage } from '../pages/sobre-catamarca/sobre-catamarca';
import { PoiDetailPageModule } from './../pages/poi-detail/poi-detail.module';
import { PoiDetailPage } from './../pages/poi-detail/poi-detail';
import { PoiDetailModalDescPageModule } from './../pages/poi-detail-modal-desc/poi-detail-modal-desc.module';
import { PoiDetailModalDescPage } from '../pages/poi-detail-modal-desc/poi-detail-modal-desc';
import { InfoCatProvider } from '../providers/sgtur/infoCat';


@NgModule({
    declarations: [
        MyApp,
        HomePage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule,
        AboutPageModule,
        PoiListPageModule,
        PoiDetailPageModule,
        CategoriesPageModule,
        MapaPageModule,
        BusquedaPageModule,
        SobreCatamarcaPageModule,
        PoiDetailModalDescPageModule,
        DeptoDetailPageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        PoiListPage,
        PoiDetailPage,
        CategoriesPage,
        AboutPage,
        MapaPage,
        BusquedaPage,
        SobreCatamarcaPage,
        PoiDetailModalDescPage,
        DeptoDetailPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        Diagnostic,
        Device,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        CoreProvider,
        AmauttaProvider,
        SgturProvider,
        AmauttaComerciosProvider,
        SgturHospedajesProvider,
        SgturPOIProvider,
        InfoCatProvider
    ]
})
export class AppModule {}
