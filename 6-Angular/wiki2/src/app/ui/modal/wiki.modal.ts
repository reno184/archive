import {Component, OnInit, OnDestroy} from "@angular/core";
import {take} from "rxjs/operators";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FireRefererModel, RefererModel} from "../../core/model/referer.model";
import {Subscription} from "rxjs";
import firebase from "firebase/compat";
import {RefererSubject} from "../../core/subject/referer.subject";
import QuerySnapshot = firebase.firestore.QuerySnapshot;

@Component({
    selector: 'url-modal',
    template: `
        <form class="card-body" [formGroup]="wikiForm" (ngSubmit)="onSubmit()">
            <div class="mb-3">
                <input type="text" formControlName="title" class="form-control" placeholder="title" autocomplete="off" required>
            </div>
            <div class="mb-3">
                <input type="text" formControlName="url" class="form-control" placeholder="url" autocomplete="off" required>
            </div>
            <div class="mb-3">
                <select name="sourceName" class="form-control" formControlName="referer" required>
                    <option value="">Please select</option>
                    <option *ngFor="let referer of refererList" [value]="referer.id">{{referer.name}}</option>
                </select>
            </div>
            <footer>
                <button class="btn btn-sm btn-primary ml-2 " type="submit" [disabled]="wikiForm.invalid">Valid</button>
            </footer>
        </form>
    `,
    styles: []
})
export class WikiModal implements OnInit, OnDestroy {
    refererList:RefererModel[]= []
    sub: Subscription
    wikiForm: FormGroup
    constructor(private formBuilder: FormBuilder, private afs: AngularFirestore, private router : Router, private refererSubject: RefererSubject) {
        this.wikiForm = this.formBuilder.group(
            {
                'title': this.formBuilder.control('',  [Validators.required]),
                'url': this.formBuilder.control('',[Validators.required]),
                'referer' : this.formBuilder.control('',[Validators.required])
            }
        )
        this.sub = this.afs.collection<FireRefererModel>('setting/ref/source').get().pipe(take(1)).subscribe(result =>{
            (result as QuerySnapshot<FireRefererModel>).forEach(doc=>{
                this.refererList.push({id: doc.id, ...doc.data()})
            })
        })
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe()
    }

    async onSubmit(){
        // todo get inspiration stackblitz for reactive form
        const selectedReferer = this.refererList.find(referer=> referer.id === this.wikiForm.get('referer')?.value)
        this.refererSubject.addAction.next(selectedReferer as RefererModel)
        await this.router.navigate([{ outlets:  { modal:  null  }}]);
    }
}
