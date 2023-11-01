import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {Group} from "../model/group";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor(private afs: AngularFirestore, public authService: AuthService) {
    }


    getItems(placeId: string): Observable<Group[]> {
        const ref = this.afs.collection<Group>('resto/' + placeId + '/group', ref => ref.orderBy('name'));
        return ref.valueChanges()
    }
}
