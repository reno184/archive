import {Injectable} from "@angular/core";
import {Store} from "../../store";
import {WikiModelApp} from "./wikiFeature.model";
import {QueryFn} from "@angular/fire/compat/firestore";
import {WikiFeatureManager} from "./wikiFeature.manager";

export class WikiFeatureState {
    loading: boolean = false
    list: WikiModelApp[] = [];
    lastItem: WikiModelApp | undefined
}


@Injectable({providedIn: 'root'})
export class WikiFeatureStore extends Store<WikiFeatureState> {
    constructor(private wikiFeatureManager : WikiFeatureManager){
        super(new WikiFeatureState())
    }
    private mutation_loading(loading:boolean): void {
        this.setState({...this.state,loading });
    }
    private mutation_appendWikis(newList: WikiModelApp[]): void {
        this.setState({...this.state,list: [...this.state.list, ...newList] });
    }

    private mutation_setLastItem(lastItem: WikiModelApp): void {
        this.setState({ ...this.state, lastItem });
    }

    private effect_appendWikis(): void {
        const query: QueryFn =  ref => this.state.lastItem ? ref.orderBy('desc').startAfter(this.state.lastItem).limit(20) : ref.orderBy('desc').limit(20)

        this.mutation_loading(true)

        this.wikiFeatureManager.list(query).then(result=>{
            this.mutation_loading(false)
            this.mutation_appendWikis(result)
            this.mutation_setLastItem(result[result.length-1])
        })
    }

    action_appendWikis(): void {
        this.effect_appendWikis()
    }

}
