import {Component,OnDestroy} from '@angular/core';
import {EpisodeModel} from "../../../core/manager/episode/episode.model";
import {Subscription} from "rxjs";
import {EpisodeStore} from "../../../core/manager/episode/episode.store";
import {Router} from "@angular/router";

@Component({
    selector: 'app-episode-layout',
    template: `
    <form  (submit)="onSubmit($event)">
        <div class="card-body">
            <label class="form-label mt-1 mb-0 "><small>title</small></label>
            <input type="text" class="form-control" name="titre" required autocomplete="off" >
            <label class="form-label mt-1 mb-0 "><small>patreon url</small></label>
            <input type="text" class="form-control" name="patreonUrl" autocomplete="off" >
            <label class="form-label mt-1 mb-0 "><small>podcast url</small></label>
            <input type="text" class="form-control" name="podcastUrl" autocomplete="off" >
            <label class="form-label mt-1 mb-0 "><small>pdf url</small></label>
            <input type="text" class="form-control" name="pdfUrl"  autocomplete="off" >
        </div>
        <footer class="card-footer">
            <button type="submit" class="btn btn-primary btn-sm" ><span *ngIf="pending; else t1">...</span><ng-template #t1 >Add</ng-template></button>
        </footer>
    </form>
  `,
    styles: []
})
export class EpisodeModalComponent implements OnDestroy{
    sub= new Subscription()
    pending = false

    constructor(private episodeStore : EpisodeStore, private router : Router) {
        this.sub = this.episodeStore.state$.subscribe(async state =>{
            this.pending = state.pending
            if(state.closeModal){
                await this.router.navigate([{ outlets:  { modal:  null  }}]);
            }
        })
    }
    ngOnDestroy(){
        this.sub.unsubscribe()
    }
    onSubmit(e: Event): void {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const body: EpisodeModel = {
            title : form['titre'].value,
            patreonUrl: form['patreonUrl'].value,
            podcastUrl: form['podcastUrl'].value,
            pdfUrl: form['pdfUrl'].value
        }
        this.episodeStore.action_add(body)
    }
}
