import {Component, OnDestroy} from '@angular/core';
import {map, Subscription} from "rxjs";
import {EpisodeStore} from "../../../core/manager/episode/episode.store";
import {VocabularyModel} from "../../../core/manager/vocabulary/vocabulary.model";
import {VocabularyStore} from "../../../core/manager/vocabulary/vocabulary.store";

@Component({
    selector: 'app-vocabulary-page',
    template: `
    <div>
        <a [routerLink]="['/', { outlets: { modal: 'modal/vocabulary'}}]" class="btn btn-primary btn-sm">Add</a>
        <div>
            <div *ngFor="let source of sources" >
            {{source.txtEnglish}}
            </div>
        </div>
    </div>
  `,
    styles: [
    ]
})
export class VocabularyPageComponent implements OnDestroy{
    sources: VocabularyModel[] = []
    sub= new Subscription()

    constructor(private vocabularyStore : VocabularyStore) {
        this.sub = this.vocabularyStore.state$.pipe(map(state => state.list)).subscribe(list =>{
            this.sources = list
        })
        this.vocabularyStore.action_fetch_request()
    }
    ngOnDestroy(){
        this.sub.unsubscribe()
    }
}
