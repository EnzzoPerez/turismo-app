import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AmauttaProvider } from './amautta';


@Injectable()
export class AmauttaComerciosProvider extends AmauttaProvider {

    constructor(public http: Http) {
        super(http);
    }

     list(geojson?: boolean, lon?: number, lat?: number, dist: number = 50000, items: number = 100){
        let queryparams = 'comercio/?format=json&ordering=departamento__nombre&page_size=' + items;
        
        if (geojson){
            queryparams += '&geojson=true';
        }

        if (lon && lat){
            console.log('lat & lon')
            queryparams += '&dist=' + dist + '&point=' + lon + ',' + lat;
        }

        console.log(this.api_url + queryparams);

        return this.http.get(this.api_url + queryparams).map(
            response => response.json()
        );
    }

}
