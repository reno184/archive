import {Component, OnDestroy, OnInit} from '@angular/core';
import {WikiFeatureStore} from "../../core/bll/wikiFeature/wikiFeature.store";
import {Subscription} from "rxjs";
import {WikiModelApp} from "../../core/bll/wikiFeature/wikiFeature.model";

@Component({
  selector: 'panel-wiki-list',
  template: `
      <fieldset>
          {{loading}}
          <legend>list <small *ngIf="wikiList">{{wikiList.length}}</small></legend>
          <ul id="list" style="height: 200px; overflow-y: auto;padding-right: 20px" scrollable  (scrollPosition)="scrollHandler($event)">
              <li *ngFor="let item of wikiList; let i = index" style="display: flex" >
                  <span style="width:40px;margin-right: 10px; color:gray">#{{i}}</span>
                  <span style="flex: 1">{{item.desc}}</span>
                  <span>update</span>
              </li>
              <li *ngIf="loading" style="font-style: italic; color: grey; text-align: center">Loading...</li>
          </ul>
      </fieldset>
      <a [routerLink]="['/', { outlets: { modal: 'modal/tagAdd'}}]" class="btn btn-primary btn-sm">add</a>
  `,
  styles: [
  ]
})
export class WikiListPartial implements OnInit, OnDestroy {

    wikiList : WikiModelApp[] = []
    loading = false;
    sub = new Subscription()
    constructor(private wikiFeatureStore : WikiFeatureStore) {}

    ngOnInit(): void {

        (document.getElementById('list') as HTMLElement).scrollTo(0,0)

        this.sub = this.wikiFeatureStore.state$.subscribe(state =>{
            this.loading = state.loading
            this.wikiList = state.list
        })

        this.wikiFeatureStore.action_appendWikis()

    }

    ngOnDestroy() : void  {
        this.sub.unsubscribe()
    }

    scrollHandler(value: string) {
        if(value==='bottom' && !this.loading){
            this.wikiFeatureStore.action_appendWikis()
        }
    }
}
