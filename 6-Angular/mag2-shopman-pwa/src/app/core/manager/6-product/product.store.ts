import {Injectable} from '@angular/core'
import {Store} from '../../store'
import {ProductApiGet, ProductModel} from './product.model'
import {ProductManager} from './product.manager'

export class ProductState {
    initialized = false
    loading = false
    pending = false
    closeModal = false
    list: ProductModel[] = []
}

@Injectable({providedIn: 'root'})
export class ProductStore extends Store<ProductState> {

    constructor(private productManager: ProductManager) {
        super(new ProductState())
    }

    /****************************************** Actions ***************************************************/

    action_get(): void {
        this.mutation_loading(true)
        this.productManager.list().then(items => {
            this.mutation_get(items)
        }).finally(() => {
            this.mutation_loading(false)
        })
    }

    /****************************************** Getters ***************************************************/
    getter_find(id: string): ProductModel {
        return this.state.list.find(item => item.id == id) || {name: 'not found', desc: '', price: 0, thumb: ''}
    }

    /****************************************** Mutations ***************************************************/

    private mutation_loading(loading: boolean): void {
        this.setState({...this.state, loading})
    }

    private mutation_get(list: ProductModel[]): void {
        this.setState({...this.state, list, initialized: true})
    }

    private mutation_post(item: ProductModel): void {
        this.setState({...this.state, list: [...this.state.list, {...item}]})
    }

    private mutation_patch(id: string, item: ProductModel): void {
        this.setState({...this.state, list: this.state.list.map(x => x.id == id ? {...item} : x)})
    }

    private mutation_delete(id: string) {
        this.setState({...this.state, list: this.state.list.filter(item => item.id !== id)})
    }

    private mutation_pending(pending: boolean): void {
        this.setState({...this.state, pending})
    }

    action_patch(id: string, body: ProductApiGet): void {
        this.mutation_pending(true)
        this.productManager.update(id, body).then(item => {
            this.mutation_patch(id, item)
        }).finally(() => {
            this.mutation_pending(false)
            this.effect_modal()
        })
    }

    action_post2(body: FormData): void {
        this.mutation_pending(true)
        this.productManager.post2(body).then(item => {
            this.mutation_post(item)
        }).finally(() => {
            this.mutation_pending(false)
            this.effect_modal()
        })
    }

    action_post(body: ProductApiGet): void {
        this.mutation_pending(true)
        this.productManager.post(body).then(item => {
            this.mutation_post(item)
        }).finally(() => {
            this.mutation_pending(false)
            this.effect_modal()
        })
    }

    action_delete(id: string): void {
        this.mutation_pending(true)
        this.productManager.delete(id).then(() => {
            this.mutation_delete(id)
        }).finally(() => {
            this.mutation_pending(false)
        })
    }

    private mutation_modal(closeModal: boolean): void {
        this.setState({...this.state, closeModal})
    }

    /****************************************** Effects ***************************************************/
    private effect_modal(): void {
        setTimeout(() => {
            this.mutation_modal(true)
            setTimeout(() => {
                this.mutation_modal(false)
            }, 1)
        }, 500)
    }

}
