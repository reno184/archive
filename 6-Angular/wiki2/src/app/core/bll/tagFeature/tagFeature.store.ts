import {TagModelApi, TagModelApp} from "./tagFeature.model";
import {Injectable} from "@angular/core";
import {Store} from "../../store";
import {TagFeatureManager} from "./tagFeature.manager";

export class TagFeatureState {
    loading: boolean = false
    adding : boolean = false
    list: TagModelApp[] = []
}


@Injectable({providedIn: 'root'})
export class TagFeatureStore extends Store<TagFeatureState> {

    constructor(private tagFeatureManager : TagFeatureManager){
        super(new TagFeatureState())
    }
    private mutation_loading(loading:boolean): void {
        this.setState({...this.state,loading });
    }

    private mutation_adding(adding:boolean): void {
        this.setState({...this.state,adding });
    }


    private mutation_add(item:TagModelApp): void {
        this.setState({...this.state, list : [...this.state.list, item] });
    }

    private mutation_delete(id:string): void {
        this.setState({...this.state, list : this.state.list.filter(item=> item.id !== id) });
    }

    private mutation_fetch_success(newList: TagModelApp[]): void {
        this.setState({...this.state,list: newList });
    }
    private effect_fetch_request(): void {
        this.mutation_loading(true)
        this.tagFeatureManager.list().then(result=>{
            this.mutation_loading(false)
            this.mutation_fetch_success(result)
        })
    }

    private effect_add(item :TagModelApi): void {
        this.mutation_adding(true)
        this.tagFeatureManager.add(item).then(result=>{

            this.mutation_add(result)
            this.mutation_adding(false)
        })
    }

    private effect_delete(id :string): void {
       this.tagFeatureManager.delete(id).then(result=>{
            this.mutation_delete(result)
        })
    }


    action_fetch_request(): void {
        this.effect_fetch_request()
    }

    action_delete(id : string): void {
        this.effect_delete(id)
    }

    action_add(item : TagModelApi): void {
        this.effect_add(item)
    }

}
