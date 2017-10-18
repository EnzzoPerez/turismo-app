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

}