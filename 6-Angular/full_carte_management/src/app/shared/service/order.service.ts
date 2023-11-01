import {Injectable} from '@angular/core';
import {Zone} from "../model/zone";
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private afs: AngularFirestore) {
    }
    getZones(placeId: string): Observable<Zone[]> {
        const ref = this.afs.collection<Zone>('resto/3333/zone', ref => ref.orderBy('name'));
        return ref.valueChanges()
    }
    // mise à jour de la commande dans orders
    async updateOrder(placeId: string, zoneId: string, orderId: string, orderStatus: string) {
        const ref = this.afs.doc<Zone>('resto/3333/zone/' + zoneId);
        const zoneDoc = await ref.get().toPromise()
        const orders = Object.assign({}, zoneDoc.data().orders);
        const anonymousId = orders[orderId].anonymousId;
        orders[orderId].status = orderStatus;
        await ref.update({orders});
       /* return this.afs.doc('anonymous/' + anonymousId + '/orders/' + orderId).update({
            status: parseInt(orderStatus)
        })*/
    }
}
