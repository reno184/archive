import {FetchService} from "../../fetch.service";
import {Injectable} from "@angular/core";
import {VocabularyModel} from "./vocabulary.model";

@Injectable({
    providedIn: 'root'
})
export class VocabularyManager  {
    constructor(private fetchService:FetchService) {}

    list(): Promise<VocabularyModel[]>{
        return this.fetchService.list<VocabularyModel[]>('vocabulary') as Promise<VocabularyModel[]>
    }

    add(body :VocabularyModel): Promise<string>{
        return this.fetchService.add<VocabularyModel>('vocabulary', body)  as Promise<string>
    }

    update(id :string, body:VocabularyModel): Promise<void>{
        return this.fetchService.update<VocabularyModel>('vocabulary',id, body) as Promise<void>
    }
}
