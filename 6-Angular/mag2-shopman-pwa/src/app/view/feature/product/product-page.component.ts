import {Component, OnDestroy} from '@angular/core'
import {ProductModel} from '../../../core/manager/6-product/product.model'
import {ProductStore} from '../../../core/manager/6-product/product.store'
import {map, Subscription} from 'rxjs'
import {ActivatedRoute} from '@angular/router'

@Component({
    selector: 'app-product-page',
    template: `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 py-5 text-center">
                    <a [routerLink]="['/', { outlets: { modal: 'modal/6-products'}}]" [queryParams]="{body: 'fix'}"
                       class="btn btn-primary "><i class="far fa-plus-circle align-middle mr-1"></i><span
                            class="align-middle text-capitalize">product</span></a>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                <div class="col" *ngFor="let product of products">
                    <div class="card shadow mb-3" style="max-width: 540px;">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img [src]="product.thumb" class="rounded-start"
                                     style="height: 100%; object-fit: cover; width: 100%" [alt]="product.name">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">{{product.name}}</h5>
                                    <p class="card-text">{{product.desc}}</p>
                                    <p class="card-text"><small class="text-body-secondary">Price {{product.price}}
                                        $</small>
                                    </p>
                                    <div class="text-right">
                                        <a href="#" (click)="onDelete($event,product.id)" class="card-link">Delete</a>
                                        <a [routerLink]="['/', { outlets: { modal: 'modal/6-products'}}]"
                                           [queryParams]="{ 'update' : product.id }" class="card-link ">Update</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: []
})
export class ProductPageComponent implements OnDestroy {
    products: ProductModel[] = []
    sub = new Subscription()

    // todo check id string or number and price string or number, and undefined
    constructor(private productStore: ProductStore, private activatedRoute: ActivatedRoute) {
        this.sub = this.productStore.state$.pipe(map(state => state.list)).subscribe(list => {
            this.products = list
        })
        this.productStore.action_get()

    }

    ngOnDestroy() {
        this.sub.unsubscribe()
    }

    onDelete(e: Event, id?: string) {
        e.preventDefault()
        this.productStore.action_delete(id as string)
    }
}
