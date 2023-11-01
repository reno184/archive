import {Component, OnDestroy, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {TagFeatureStore} from "../../core/bll/tagFeature/tagFeature.store";
import {Subscription} from "rxjs";

@Component({
    selector: 'url-modal',
    template: `
        <a [routerLink]="['/', {outlets: {modal: null}}]" style="position: fixed; background:transparent; inset:0;" ></a>
        <div class="card" appSticky data-element-id="toto" style="position: absolute;" >
            <form class="card-body" (submit)="onSubmit($event)"  >
                <h4 style="margin-bottom: 15px">Add tag<span *ngIf="adding">...</span></h4>
                <div style="margin-bottom: 5px">
                    <input type="text" name="tag" class="form-control" placeholder="tag"  autocomplete="off" required>
                </div>
                 <footer style="text-align: center;margin-top: 15px">
                    <button class="btn btn-sm btn-primary ml-2 " type="submit"   >Add</button>
                </footer>
            </form>
        </div>
    `,
    styles: []
})
export class TagPopover implements OnInit, OnDestroy {
    sub= new Subscription()
    adding: boolean = false
    constructor(private tagFeatureStore : TagFeatureStore, private router : Router, ) {
        this.sub = this.tagFeatureStore.state$.subscribe(async state =>{
            const temp =  this.adding
            this.adding = state.adding
            if(temp && !this.adding){
                await this.router.navigate([{ outlets:  { modal:  null  }}]);
            }
        })
    }

    ngOnInit(): void {
    }
    ngOnDestroy(){
        this.sub.unsubscribe()
    }
    async onSubmit(e:Event){
        e.preventDefault()
        const form = e.target as HTMLFormElement
        this.tagFeatureStore.action_add({ name : form['tag'].value, counter : 0})
    }
}
