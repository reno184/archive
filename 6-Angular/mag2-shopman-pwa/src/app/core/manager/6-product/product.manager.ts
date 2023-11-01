import {FetchService} from '../../fetch.service'
import {ProductApiGet, ProductModel} from './product.model'
import {Injectable} from '@angular/core'
import {GlobalStore} from '../../global.store'

@Injectable({
    providedIn: 'root'
})
export class ProductManager {
    constructor(private fetchService: FetchService, private globalStore: GlobalStore) {
    }

    async list(): Promise<ProductModel[]> {
        return new Promise((resolve, reject) => {
            this.fetchService.get<ProductApiGet[]>('api/6-products').then(docs => {
                resolve(
                    docs.reduce((list: ProductModel[], row: ProductApiGet) => {
                        list.push({
                            id: row._id,
                            name: row.name,
                            desc: row.desc,
                            price: parseFloat(row.price),
                            thumb: row.image
                        })
                        return list
                    }, [])
                )
            }, err => {
                this.globalStore.action_error(err)
                reject()
            })
        })
    }

    post2(body: FormData): Promise<ProductModel> {
        return new Promise((resolve, reject) => {
            this.fetchService.post2('api/6-products', body).then(id => {
                resolve({
                    id: id,
                    name: body.get('name') as string,
                    desc: body.get('desc') as string,
                    price: parseFloat(body.get('price') as string),
                    thumb: 'placeholder'
                })
            }, err => {
                this.globalStore.action_error(err)
                reject()
            })
        })
    }

    post(body: ProductApiGet): Promise<ProductModel> {
        return new Promise((resolve, reject) => {
            this.fetchService.post<ProductApiGet>('api/6-products', body).then(id => {
                resolve({
                    id: id,
                    name: body.name,
                    desc: body.desc,
                    price: parseFloat(body.price),
                    thumb: body.image
                })
            }, err => {
                this.globalStore.action_error(err)
                reject()
            })
        })
    }

    update(id: string, body: ProductApiGet): Promise<ProductModel> {
        return new Promise((resolve, reject) => {
            this.fetchService.patch<ProductApiGet>('api/6-products/' + id, body).then(() => {
                resolve({
                    id: id,
                    name: body.name,
                    desc: body.desc,
                    price: parseFloat(body.price),
                    thumb: body.image
                })
            }, err => {
                this.globalStore.action_error(err)
                reject()
            })
        })
    }

    delete(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.fetchService.delete('api/6-products/' + id).then(() => {
                resolve()
            }, err => {
                this.globalStore.action_error(err)
                reject()
            })
        })
    }
}
