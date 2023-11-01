import {Injectable} from "@angular/core";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class CarouselService {

    // getDownloadUrl
    constructor(private angularFireStorage: AngularFireStorage) {

    }

    getImageUrl(id): Observable<string> {
        return this.angularFireStorage.ref('crm/contentful/img_' + id).getDownloadURL().pipe(tap(x => console.log(x)))
    }

    async getList(): Promise<any[]> {
        const rep = []
        const promises = [];
        const result = await this.angularFireStorage.ref('crm/contentful').listAll().toPromise();
        for (let item of result.items) {
            let path = item.fullPath;
            rep.push({path})
            promises.push(item.getDownloadURL())
        }
        const urls = await Promise.all(promises);
        rep.map((item, index) => {
            item.id = Date.now() + index;
            item.url = urls[index];
        });
        console.log(rep)
        return rep;
    }
}
