import { Component } from '@angular/core';

@Component({
    selector: 'google-map',
    templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

    text: string;

    constructor() {
        console.log('Hello GoogleMapComponent Component');
        this.text = 'Hello World';
    }

}
