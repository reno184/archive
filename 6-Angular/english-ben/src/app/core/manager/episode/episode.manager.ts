import {FetchService} from "../../fetch.service";
import {EpisodeModel} from "./episode.model";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class EpisodeManager  {
    constructor(private fetchService:FetchService) {}

    list(): Promise<EpisodeModel[]>{
        return this.fetchService.list<EpisodeModel[]>('episode') as Promise<EpisodeModel[]>
    }

    add(body :EpisodeModel): Promise<string>{
        return this.fetchService.add<EpisodeModel>('episode', body)  as Promise<string>
    }

    update(id :string, body:EpisodeModel): Promise<void>{
        return this.fetchService.update<EpisodeModel>('episode',id, body) as Promise<void>
    }
}
