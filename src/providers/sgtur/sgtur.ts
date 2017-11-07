import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SgturProvider {

    api_url: string = "https://sgtur.colmenacoop.com/api/v1/";
    //api_url: string = "http://127.0.0.1:8000/api/v1/";

    constructor(public http: Http) {

    }

}
