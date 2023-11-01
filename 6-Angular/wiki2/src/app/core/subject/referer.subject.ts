import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {RefererModel} from "../model/referer.model";

@Injectable({
    providedIn: 'root'
})
export class RefererSubject {
    addAction = new Subject<RefererModel>()
    get addObservable(){
        return this.addAction.asObservable()
    }
}
