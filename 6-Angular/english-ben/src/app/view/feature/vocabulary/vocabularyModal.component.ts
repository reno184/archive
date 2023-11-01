import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {VocabularyModel} from "../../../core/manager/vocabulary/vocabulary.model";
import {VocabularyStore} from "../../../core/manager/vocabulary/vocabulary.store";

@Component({
    selector: 'app-vocabulary-layout',
    template: `
      <form  (submit)="onSubmit($event)">
          <div class="card-body">
              <label class="form-label mt-1 mb-0 "><small>txtEnglish</small></label>
              <input type="text" class="form-control" name="txtEnglish" autocomplete="off" >
              <label class="form-label mt-1 mb-0 "><small>fromOrigin</small></label>
              <input type="text" class="form-control" name="fromOrigin" autocomplete="off" >
          </div>
          <footer class="card-footer">
              <button type="submit" class="btn btn-primary btn-sm" >Add</button>
          </footer>
      </form>
  `,
    styles: [
    ]
})
export class VocabularyModalComponent implements OnDestroy{
    sub= new Subscription()
    pending = false

    constructor(private vocabulary : VocabularyStore, private router : Router) {
        this.sub = this.vocabulary.state$.subscribe(async state =>{
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
        const body: VocabularyModel = {
            txtEnglish: form['txtEnglish'].value,
            fromOrigin: form['fromOrigin'].value
        }
        this.vocabulary.action_add(body)
    }
}
