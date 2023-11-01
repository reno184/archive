import {Component, OnDestroy} from '@angular/core';
import {TagModelApp} from "../../core/bll/tagFeature/tagFeature.model";
import {TagFeatureStore} from "../../core/bll/tagFeature/tagFeature.store";
import {Subscription} from "rxjs";

@Component({
  selector: 'panel-tag',
  template: `
     <!-- todo add add tag popover -->
      <fieldset>
          <legend>list tags</legend>
          <div style="text-align: end">  <a [routerLink]="['/', { outlets: { modal: 'popover'}}]" data-target-id="toto" class="btn btn-primary btn-sm">New</a></div>
          <ul>
              <li *ngFor="let tag of $tags " style="display: flex;margin-bottom: 10px">
                  <div style="flex: 1; ">{{tag.name}}</div><button (click)="onDelete(tag.id)">remove</button>
              </li>
          </ul>
      </fieldset>
  `,
  styles: [

  ]
})

export class PanelTagPartial implements OnDestroy{

    $tags: TagModelApp[] = []
    sub= new Subscription()

    constructor(private tagFeatureStore : TagFeatureStore) {
        this.sub = this.tagFeatureStore.state$.subscribe(state =>{
            this.$tags = state.list
        })
        this.tagFeatureStore.action_fetch_request()
    }
    ngOnDestroy(){
        this.sub.unsubscribe()
    }
    onDelete(id:string): void{
        this.tagFeatureStore.action_delete(id)
    }
}
