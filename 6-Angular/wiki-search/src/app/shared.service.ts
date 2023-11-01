import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

    formUrlSubmitted = new Subject()

    getFormUrlSubmitted(){
        return this.formUrlSubmitted.asObservable()
    }

}
