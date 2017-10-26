import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { SgturProvider } from './sgtur';

import 'rxjs/add/operator/map'

@Injectable()
export class InfoCatProvider extends SgturProvider{
    constructor(public http: Http){
        super(http);
    }

    //GET DEPTO FROM JSON IN FOLDER DATA (HARDCODE)
    getDeptos(){
		return this.http.get('assets/data/deptos.json')
			.map(res => res.json())
	}

    //GET DEPTOS FROM API SGTUR
    getDeptosList(){
        return this.http.get(this.api_url + 'departamento').map(response => response.json())
    }

    getDptoUnique(pk: any){
        return this.http.get(this.api_url + 'departamento/' + pk).map( response => response.json() )
    }
}