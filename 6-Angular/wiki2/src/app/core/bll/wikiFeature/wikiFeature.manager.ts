import {Injectable} from "@angular/core";
import {ApiClientService} from "../../dal/apiClient";
import {wikiFeatureMapper} from "./wikiFeature.mapper";
import {WikiModelApi, WikiModelApp} from "./wikiFeature.model";
import {QueryFn} from "@angular/fire/compat/firestore";

@Injectable({providedIn: 'root'})
export class WikiFeatureManager {

    constructor(private apiClient: ApiClientService) {
    }

    list = (query:QueryFn): Promise<WikiModelApp[]> =>{
        return new Promise((resolve, reject) => {
            this.apiClient.list<WikiModelApi>('wiki',query).then((result) => {
                resolve(wikiFeatureMapper(result))
            }).catch((err:Error) => {
                reject(err)
            })
        })
    }
}
