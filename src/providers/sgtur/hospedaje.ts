import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SgturProvider } from './sgtur';


@Injectable()
export class SgturHospedajesProvider extends SgturProvider {

    constructor(public http: Http) {
        super(http);
    }

    getRadioHospedajes(point: string, radio: number = 1){
		return this.http.get(this.api_url + 'hospedaje/?geojson=true&dist='+ radio +'&point='+ point +'&format=json')
			.map(res => res.json());
	}

    // url = '/api/v1/hospedaje/?format=json&page_size=50&dist='+mts+'&point='+poi_lon+','+poi_lat;
    list(geojson?: boolean, lon?: number, lat?: number, dist: number = 50000, items: number = 100){
        let queryparams = 'hospedaje/?format=json&ordering=categoria__nombre&page_size=' + items;
        
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