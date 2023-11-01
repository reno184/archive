import {Component, OnDestroy} from '@angular/core'
import {ProductModel} from '../../../core/manager/6-product/product.model'
import {filter, map, mergeMap, Subscription, take} from 'rxjs'
import {ProductStore} from '../../../core/manager/6-product/product.store'
import {ActivatedRoute, Router} from '@angular/router'

@Component({
    selector: 'app-product-modal',
    template: `
        <form (submit)="onSubmit($event)">
            <div class="card-body">
                <div>
                    <img [src]="placeholder" style="width: 150px" alt="placeholder">
                </div>
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" type="file" (change)="onFileUpload($event)" id="formFile">
                <input type="hidden" name="thumb" [value]="product.thumb">
                <label class="form-label mt-1 mb-0 "><small>name</small></label>
                <input type="text" class="form-control" name="titre" [value]="product.name" required autocomplete="off">
                <label class="form-label mt-1 mb-0 "><small>description</small></label>
                <input type="text" class="form-control" name="desc" [value]="product.desc" autocomplete="off">
                <label class="form-label mt-1 mb-0 "><small>price</small></label>
                <input type="number" class="form-control" [value]="product.price" name="price">
            </div>
            <footer class="card-footer">
                <button type="submit" class="btn btn-primary btn-sm">
                    <span *ngIf="pending; else t1">...</span>
                    <ng-template #t1>
                        <span *ngIf="queryIdProduct === '-1'">Add</span>
                        <span *ngIf="queryIdProduct !== '-1'">Update</span>
                    </ng-template>
                </button>
            </footer>
        </form>
    `,
    styles: []
})
export class ProductModalComponent implements OnDestroy {
    product: ProductModel = {name: '', desc: '', price: 0, thumb: ''}
    subState = new Subscription()
    subIsUpdate = new Subscription()
    pending = false
    queryIdProduct = '-1'
    file: File | null = null
    placeholder = ''

    constructor(private productStore: ProductStore, private router: Router, private activatedRoute: ActivatedRoute) {

        this.subState = this.productStore.state$.subscribe(async state => {
            this.pending = state.pending
            if (state.closeModal) {
                await this.router.navigate([{outlets: {modal: null}}])
            }
        })

        this.subIsUpdate = this.productStore.state$.pipe(filter(state => state.initialized, take(1)), mergeMap(() => {
            return this.activatedRoute.queryParams.pipe(
                filter(params => !!params['update'])
                , take(1)
                , map(params => params['update']))
        })).subscribe(id => {
            this.queryIdProduct = id
            this.product = this.productStore.getter_find(id)
        })
    }

    ngOnDestroy() {
        this.subState.unsubscribe()
        this.subIsUpdate.unsubscribe()
    }

    onFileUpload(event: Event) {
        const file = ((event.target as HTMLInputElement).files as FileList)[0]
        this.placeholder = URL.createObjectURL(file)
        this.file = file
    }

    onSubmit(e: Event): void {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData()
        formData.append('name', form['titre'].value)
        formData.append('desc', form['desc'].value)
        formData.append('price', form['price'].value)
        formData.append('imgProduct', this.file as File)

        if (this.queryIdProduct !== '-1') {
            // this.productStore.action_patch(this.queryIdProduct, formData)
        } else {
            this.productStore.action_post2(formData)
        }
    }
}
