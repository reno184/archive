import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, mergeMap} from "rxjs/operators";
import {from, Observable} from "rxjs";
import {AuthService} from "../common/service/auth.service";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    constructor(private httpClient: HttpClient, private authService: AuthService) {

    }

    list(feature: string): Observable<any[]> {
        return from(this.authService.getToken(true)).pipe(mergeMap(authorization => {
            return this.httpClient.get<any[]>(environment.url + `/contentful/list/${feature}`, {headers: {authorization}}).pipe(map(results => {
                const temp = [];
                for (let key in results) {
                    temp.push(Object.assign({id: key}, results[key]))
                }
                return temp;
            }));
        }));
    }

    sort(feature: string, list: any[]): Observable<any> {
        return from(this.authService.getToken(true)).pipe(mergeMap(authorization=>{
            return this.httpClient.post(environment.url + `/contentful/sort/${feature}`, list, {
                headers : { authorization},
                responseType: 'text'
            });
        }));
    }

    // todo comprendre comment sotcker en base une lesson
    add(feature: string, obj: any): Observable<any> {
        return from(this.authService.getToken(true)).pipe(mergeMap(authorization=>{
            return this.httpClient.post(`${environment.url}/contentful/add/${feature}`, obj, {
                headers : { authorization}
            });
        }));
    }

    update(feature: string, id: string, obj: any): Observable<any> {
        return from(this.authService.getToken(true)).pipe(mergeMap(authorization=>{
            return this.httpClient.put(environment.url + `/contentful/update/${feature}/${id}`, obj, {
                headers : { authorization},
                responseType: 'text'
            });
        }));
    }

    delete(feature: string, id: string): Observable<any> {
        return from(this.authService.getToken(true)).pipe(mergeMap(authorization=>{
            return  this.httpClient.delete(environment.url + `/contentful/delete/${feature}/${id}`, {
                headers : { authorization},
                responseType: 'text'
            });
        }));
    }
}
