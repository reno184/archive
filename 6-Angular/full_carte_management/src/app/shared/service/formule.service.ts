import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FormuleService {

  constructor(private afs: AngularFirestore) { }

    getItems(placeId: string): Observable<any[]> {
        const ref = this.afs.collection<any>('resto/' + placeId + '/formule');
        return ref.valueChanges();
    }

}
