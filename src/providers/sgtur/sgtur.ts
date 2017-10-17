import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SgturProvider {

    api_url: string = "https://sgtur.catamarca.gob.ar/api/v1/";

    constructor(public http: Http) {

    }

}
