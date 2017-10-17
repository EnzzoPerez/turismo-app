import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AmauttaProvider {

    api_url: string = "https://amautta.colmenacoop.com/api/v1/";

    constructor(public http: Http) {
        
    }

}
