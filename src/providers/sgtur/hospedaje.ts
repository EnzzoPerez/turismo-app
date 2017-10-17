import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { SgturProvider } from './sgtur';


@Injectable()
export class SgturHospedajesProvider extends SgturProvider {

    constructor(public http: Http) {
        super(http);
    }

}