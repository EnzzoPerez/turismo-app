import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController, ToastController, AlertController } from 'ionic-angular';


@Injectable()
export class CoreProvider {

    serverLoader: any;
    serverLoaderCount: number = 0;
    toast: any;

    constructor(
        public http: Http, 
        public loadingCtrl: LoadingController, 
        public toastCtrl: ToastController,
        public alertCtrl: AlertController
    ){
        
    }

    presentToast(msg: string, duration: number, position: string, buttonText: string) {
        if (this.toast){
            this.toast.dismiss();
        }
        if (buttonText){
            this.toast = this.toastCtrl.create({
                message: msg,
                position: position,
                showCloseButton: true,
                closeButtonText: 'Cerrar'
            });
            this.toast.present();
        }else{
            this.toast = this.toastCtrl.create({
                message: msg,
                duration: duration,
                position: position
            });
            this.toast.present(this.toast);
        }
        
    }

    presentLoading(msg: string) {
        this.serverLoader = this.loadingCtrl.create({
            content: msg
        });
        this.serverLoader.present();
        this.serverLoaderCount += 1;
    }

    dismissLoading(){
        for (var _i = 0; _i <= this.serverLoaderCount; _i++) {
            this.serverLoader.dismiss();
        }
        this.serverLoaderCount = 0;
    }

    showAlert(title:string, subtitle: string) {
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: subtitle,
            buttons: ['OK']
        });
        alert.present();
    }

}
