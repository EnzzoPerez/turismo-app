import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AmauttaProvider } from './amautta';


@Injectable()
export class AmauttaCajerosProvider extends AmauttaProvider {

    constructor(public http: Http) {
        super(http);
    }

}
