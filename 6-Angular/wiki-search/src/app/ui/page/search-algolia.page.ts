// noinspection TypeScriptUnresolvedVariable

import {Component, OnInit} from '@angular/core';
import * as algoliasearch from "algoliasearch/lite";
import {AngularFirestore} from "@angular/fire/firestore";
import {InstantSearchConfig} from "angular-instantsearch/instantsearch/instantsearch";
import {take} from "rxjs/operators";

const searchClient = algoliasearch(
    'TJ513YQXZZ',
    '64d5ea3b5a1670c0d600e6ba8d2ce033'
);

@Component({
    selector: 'search-algolia-page',
    template: `
        <div class="d-flex mt-4 mb-3 align-items-center">
            <a [routerLink]="['/page/new']"  class="btn btn-primary mr-1"><i class="far fa-plus-circle mr-1"></i>New</a>
            <a [routerLink]="['/', { outlets: { modal: 'modal/wiki'}}]" class="btn btn-primary btn-sm"><i class="far fa-link mr-1"></i>test</a>
                <a href="https://www.blogger.com/blog/posts/2681910850555586570" class="mx-2 text-success"  target="_blank" >Blogger admin</a>
                <a href="https://reno184-wiki.blogspot.com/" class="mx-2" target="_blank" >Blogger website</a>
                <a href="https://getpocket.com/my-list/tags" class="mx-2 text-success" target="_blank" >Pockets</a>
                <a href="https://stackblitz.com/" class="mx-2"  target="_blank">StackBlitz</a>
                <a href="https://jsfiddle.net/user/fiddles/all/" class="mx-2 text-success"  target="_blank">jsFiddle</a>
                <a href="https://github.com/" class="mx-2 " target="_blank">Github</a>
        </div>
            <ais-instantsearch [config]="config" >
                <ais-configure [searchParameters]="{ hitsPerPage: 3 }"></ais-configure>
                <ais-search-box></ais-search-box>
                <ais-hits>
                    <ng-template let-hits="hits">
                        <div class="card-group my-3">
                            <div *ngFor="let hit of hits" class="card mx-1">
                                <div class="card-body">
                                    <div class="card-title">
                                        <ais-highlight attribute="desc" [hit]="hit"></ais-highlight>
                                    </div>
                                    <ul class="list-group">
                                        <a [href]="url.url" target="_blank" *ngFor="let url of hit.urls" class="list-group-item list-group-item-action">{{url.source.lib}}</a>
                                    </ul>
                                    <div *ngIf="hit.content"  [innerHTML]="hit.content" class="alert alert-warning"></div>
                                    <div *ngIf="hit.url" class="alert alert-warning">{{hit.url}}</div>
                                    <footer class="my-3 d-flex">
                                        <a [routerLink]="['/page/edit']" [queryParams]="{ 'item-id' : hit.objectID }" class="btn btn-sm btn-primary mr-auto" >update</a>
                                        <button class="btn btn-sm btn-danger" (click)="onDelete(hit.objectID)">Delete</button>
                                    </footer>
                                </div>
                            </div>
                        </div>
                    </ng-template>
                </ais-hits>
                <ais-pagination></ais-pagination>
            </ais-instantsearch>
    `,
    styles: []
})
export class SearchAlgoliaPage implements OnInit {
    // @ts-ignore
    config: InstantSearchConfig = { indexName: 'wiki', searchClient    };

    constructor(private afs: AngularFirestore) {
    }

    ngOnInit(): void {
    }
    // todo study how algolia work
    async onDelete(id: string): Promise<void> {
        await this.afs.doc("wiki/" + id).delete()
    }
}
