import {Injectable} from '@angular/core'
import {Store} from './store'

export class GlobalState {
    success = ''
    error = ''
}

@Injectable({providedIn: 'root'})
export class GlobalStore extends Store<GlobalState> {

    constructor() {
        super(new GlobalState())
    }

    /****************************************** Action ***************************************************/

    action_success(msg: string): void {
        this.mutation_success(msg)
    }

    action_error(msg: string): void {
        this.mutation_error(msg)
    }

    /****************************************** Mutation ***************************************************/

    private mutation_success(msg: string): void {
        this.setState({...this.state, success: msg})
        setTimeout(() => {
            this.setState({...this.state, success: ''})
        }, 2000)
    }

    private mutation_error(msg: string): void {
        this.setState({...this.state, error: msg})
        setTimeout(() => {
            this.setState({...this.state, error: ''})
        }, 2000)
    }

}
