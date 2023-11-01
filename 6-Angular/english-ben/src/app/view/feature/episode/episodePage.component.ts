import {Component, OnDestroy} from '@angular/core';
import {EpisodeModel} from "../../../core/manager/episode/episode.model";
import {EpisodeStore} from "../../../core/manager/episode/episode.store";
import {map, Subscription} from "rxjs";

@Component({
    selector: 'app-episode-page',
    template: `
        <div>
            <a [routerLink]="['/', { outlets: { modal: 'modal/episode'}}]" class="btn btn-primary btn-sm">Add</a>
            <div >
                <div *ngFor="let source of sources" >
                    {{source.title}}
                </div>
            </div>
        </div>
  `,
    styles: [
    ]
})
export class EpisodePageComponent implements OnDestroy{
    sources: EpisodeModel[] = []
    sub= new Subscription()

    constructor(private episodeStore : EpisodeStore) {
        this.sub = this.episodeStore.state$.pipe(map(state => state.list)).subscribe(list =>{
            this.sources = list
        })
        this.episodeStore.action_fetch_request()
    }
    ngOnDestroy(){
        this.sub.unsubscribe()
    }
}
