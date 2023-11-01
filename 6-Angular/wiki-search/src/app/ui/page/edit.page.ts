import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/firestore";
import {UrlModel} from "../../models/url.model";
import {SharedService} from "../../shared.service";
import {Subscription} from "rxjs";
import {NgForm} from "@angular/forms";

export interface ItemModel {
    desc:string
    urls: UrlModel[]
    content: string
    url: string
    urlsStr: string
}

@Component({
    selector: 'edit-page',
    template: `
        <div class="row mt-3">
            <div class="col-6">
                <div class="card">
                    <form class="card-body" #editForm="ngForm" (ngSubmit)="onSubmit(editForm)">
                        <div class="form-group">
                            <input type="text" name="descName" [(ngModel)]="current.desc" #desc="ngModel"
                                   class="form-control" placeholder="title" required autocomplete="off">
                        </div>
                        <ng-container *ngIf="isUpdateMode">
                            <div *ngIf="current.content" class="alert alert-light" [innerHTML]="current.content"></div>
                            <div *ngIf="!current.content" class="alert alert-secondary border border-secondary">No content </div>
                            <div *ngIf="current.url" class="alert alert-light" [innerHTML]="current.url"></div>
                            <div *ngIf="!current.url" class="alert alert-secondary border border-secondary">No url</div>
                        </ng-container>
                        <div class="my-3 text-right">
                            <a [routerLink]="['/', { outlets: { modal: 'modal/url'}}]" class="btn btn-primary btn-sm"><i
                                    class="far fa-link mr-1"></i>ADD</a>
                        </div>
                        <input type="text" name="urlsName" [(ngModel)]="current.urlsStr" #urls="ngModel" style="display: none" required>
                        <div class="mb-3" *ngIf="current.urls.length>0">
                            <div class="d-flex align-items-center" *ngFor="let item of current.urls; index as i">
                                <div class="flex-grow-1">{{item.source.lib}}</div>
                                <a href="#" title="delete" class="text-danger"
                                   (click)="$event.preventDefault();onDeleteUrl(item.id)"><i class="far fa-minus-circle"></i></a>
                            </div>
                        </div>
                        <footer class="d-flex">
                            <a [routerLink]="['/page/algolia']" class="btn btn-sm btn-secondary">Cancel</a>
                            <button class="btn btn-sm btn-primary ml-2 mr-auto " type="submit" [innerText]="isUpdateMode ? 'Update' : 'Create'" [disabled]="editForm.invalid"></button>
                          
                        </footer>
                    </form>
       
                </div>
            </div>
        </div>
    `,
    styles: []
})

export class EditPage implements OnInit, OnDestroy {

    isUpdateMode= false
    loading = false
    current:ItemModel =  { urls : [], desc : '', content :'', url: '', urlsStr : ''}
    subscription : Subscription

    constructor( private  activatedRoute: ActivatedRoute, private router: Router, private afs: AngularFirestore, private sharedService: SharedService) {

    }

    async ngOnInit(): Promise<void> {

        const queryParams = await this.activatedRoute.queryParams.pipe(take(1)).toPromise()
        this.isUpdateMode = !!queryParams['item-id']

        if(this.isUpdateMode){
            this.loading= true
            const result = await this.afs.doc<any>('wiki/'+ queryParams['item-id']).get().toPromise()
            this.loading = false
            this.current.desc = result.data().desc
            this.current.urls = result.data().urls ||[]
            this.current.urlsStr = JSON.stringify(result.data().urls) ||''
            this.current.url = result.data().url || null
            this.current.content = result.data().content || null
        }
        // After click on modal
        this.subscription = this.sharedService.getFormUrlSubmitted().subscribe((item:UrlModel)=>{
            this.current.urls.push(item)
            this.current.urlsStr = JSON.stringify(this.current.urls )
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe()
    }

    onDeleteUrl(id: number) {
        this.current.urls = this.current.urls.filter(item=> item.id !== id)
        this.current.urlsStr = JSON.stringify(this.current.urls )
    }



    async onSubmit(form: NgForm): Promise<void> {
        const body = {
            desc: form.value.descName,
            urls: JSON.parse(form.value.urlsName)
        }

        if(this.isUpdateMode){
            const queryParams = await this.activatedRoute.queryParams.pipe(take(1)).toPromise()
            await this.afs.doc<any>('wiki/'+queryParams['item-id']).set(body);
        }else {
                await this.afs.collection<any>('wiki').add(body);
        }

        await  this.router.navigate(['/page/algolia'])
    }
}
