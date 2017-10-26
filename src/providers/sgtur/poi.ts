import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SgturProvider } from './sgtur';


@Injectable()
export class SgturPOIProvider extends SgturProvider {

    constructor(public http: Http) {
        super(http);
    }

    getPOICategories() {
        return this.http.get(this.api_url + 'poi-categoria').map(response => response.json());
    }

    getPOIByCategory(categoria: string) {
        return this.http.get(this.api_url + 'poi/?categoria__nombre__iexact=' + categoria).map(response => response.json());
    }

    getRadioPOI(point: string, radio: number = 1){
		return this.http.get(this.api_url + 'poi/?geojson=true&dist='+ radio +'&point='+ point +'&format=json')
			.map(res => res.json());
	}

    list(geojson?: boolean, lon?: number, lat?: number, dist: number = 50000, items: number = 100){
        let queryparams = 'poi/?format=json&ordering=categoria__nombre&page_size=' + items;
        
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