import {Component, OnInit} from '@angular/core';
import {SourceModel} from "../../../models/source.model";
import {take} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'setting-page',
  template: `
  <div class="row mt-3">
      <div class="col-3">
          <div class="card">
              <div class="card-header">
                  Source (website)
              </div>
              <div class="card-body">
                  <form  class="d-flex align-items-center" (submit)="onSubmit($event)">
                      <input type="text" class="form-control"  name="source" placeholder="source name" >
                      <button class="btn btn-sm btn-primary ml-2 " type="submit" >Add</button>
                  </form>
                  <div class="list-group mt-3"  >
                      <div *ngFor="let source of sources" class="list-group-item d-flex justify-content-between align-items-start">
                          <div class="me-auto">
                              {{source.name}}
                          </div>
                          <span class="badge badge-primary rounded-pill" [ngStyle]="{ 'background-color' : source.color}">{{source.counter}}</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  `,
  styles: [
  ]
})
export class SettingPage implements OnInit {
 // todo move subject and source card in individual component
  sources: SourceModel[] = []

  constructor(private afs: AngularFirestore) {
        this.afs.collection<any>('setting/ref/source').get().pipe(take(1)).toPromise().then(result => {
            result.forEach(doc => {
                this.sources.push({id: doc.id, ...doc.data()})
            })
        })
  }
    ngOnInit(): void {

    }
  onSubmit(e: Event): void {
     const form = e.target as HTMLFormElement
     this.afs.collection<any>('setting/ref/source').add({name : form.source.value, counter : 0}).then(ref=> {
         ref.get().then(doc => {
             form.reset()
             this.sources.push({id: doc.id, ...doc.data()})
             this.sources.sort(function (a, b) {
                 return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
             })
         })
     })
  }
}
