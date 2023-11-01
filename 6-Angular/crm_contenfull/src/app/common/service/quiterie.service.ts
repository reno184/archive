import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class QuiterieService {
    constructor(private httpClient: HttpClient, private authService: AuthService) {
    }

    // todo pour faire le transform dans le reducer
    list(feature: string): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + `/quiterie/list/${feature}`).pipe(map(results => {
            const temp = [];
            for (let key in results) {
                temp.push(Object.assign({id: key}, results[key]))
            }
            return temp;
        }));
    }

    sort(feature: string, list: any[]): Observable<any> {
        console.log(list)
        return this.httpClient.post(environment.url + `/quiterie/sort/${feature}`, list, {responseType: 'text'});
    }

    add(feature: string, obj: any): Observable<any> {
        return this.httpClient.post(`${environment.url}/quiterie/add/${feature}`, obj,);
    }

    update(feature: string, id: string, obj: any): Observable<any> {
        return this.httpClient.put(environment.url + `/quiterie/update/${feature}/${id}`, obj, {responseType: 'text'});
    }

    delete(feature: string, id: string): Observable<any> {
        return this.httpClient.delete(environment.url + `/quiterie/delete/${feature}/${id}`, {responseType: 'text'});
    }
}
