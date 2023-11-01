import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {take} from "rxjs/operators";
import {SourceModel} from "../../models/source.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {SharedService} from "../../shared.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'url-modal',
    template: `
    <form class="card-body" #userForm="ngForm" (ngSubmit)="onSubmit(userForm)" >
        <div class="mb-3">
            <input type="url" name="urlName" [(ngModel)]="temp.url" #url="ngModel" class="form-control" placeholder="url"  autocomplete="off" required>
            <small *ngIf="url.errors && url.touched && url.errors.required" class="text-danger">url is required.</small>
        </div>
        <div class="mb-3">
            <select  name="sourceName" class="form-control"  required [(ngModel)]="temp.source" #source="ngModel">
                <option value="">Please select</option>
                <option *ngFor="let source of items" [value]="source.id">{{source.name}}</option>
            </select>
            <small *ngIf="source.errors && source.touched && source.errors.required" class="text-danger">source is required.</small>
        </div>
         <footer>
            <button class="btn btn-sm btn-primary ml-2 " type="submit" [disabled]="userForm.invalid"   >Add</button>
        </footer>
    </form>
    `,
    styles: []
})
export class UrlModal implements OnInit {

    @Output() submitEvent = new EventEmitter();
    loading= false
    items:SourceModel[]= []
    temp = {
        url : '',
        source : ''
    }

    constructor(private afs: AngularFirestore,private sharedService: SharedService, private router : Router) {
        this.loading = true;
        this.afs.collection<SourceModel>('setting/ref/source').get().pipe(take(1)).toPromise().then(result =>{
            result.forEach(doc=>{
                this.items.push({ id : doc.id, ...doc.data() })
            })
            this.loading = false;
        })
    }

    ngOnInit(): void {
    }
    async onSubmit(form: NgForm){
      const lib = this.items[this.items.findIndex(item=> item.id === form.value.sourceName)].name
      this.sharedService.formUrlSubmitted.next({ id : Date.now(), url : form.value.urlName, source: {id : form.value.sourceName, lib }})
      await this.router.navigate([{ outlets:  { modal:  null  }}]);
    }
}
