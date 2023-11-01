import {Injectable} from "@angular/core";
import {ApiClientService} from "../../dal/apiClient";
import {TagModelApi, TagModelApp} from "./tagFeature.model";
import {tagFeatureMapper} from "./tagFeature.mapper";

@Injectable()
export class TagFeatureManager {

    constructor(private apiClient: ApiClientService) {
    }

    list = (): Promise<TagModelApp[]> =>{
        return new Promise((resolve, reject) => {
            this.apiClient.list<TagModelApi>('setting/ref/tag').then((result) => {
                resolve(tagFeatureMapper(result))
            }).catch((err:Error) => {
                reject(err)
            })
        })
    }

    add = ( value : TagModelApi): Promise<TagModelApp> =>{
        return new Promise((resolve, reject) => {
            this.apiClient.add<TagModelApi>('setting/ref/tag',value).then((result) => {
                resolve({ id : result.id, ...result.data})
            }).catch((err:Error) => {
                reject(err)
            })
        })
    }

    delete = ( id : string): Promise<string> =>{
        return new Promise((resolve, reject) => {
            this.apiClient.delete('setting/ref/tag', id).then((result) => {
                resolve(result)
            }).catch((err:Error) => {
                reject(err)
            })
        })
    }
}
