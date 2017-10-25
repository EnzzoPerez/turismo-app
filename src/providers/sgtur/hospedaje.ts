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

}