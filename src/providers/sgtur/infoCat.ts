import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { SgturProvider } from './sgtur';

import 'rxjs/add/operator/map'

@Injectable()
export class InfoCatProvider extends SgturProvider{
    constructor(public http: Http){
        super(http);
    }

    getDeptosList(){
        return this.http.get(this.api_url + 'departamento').map(response => response.json())
    }

    getDptoUnique(pk: any){
        return this.http.get(this.api_url + 'departamento/' + pk).map( response => response.json() )
    }
}