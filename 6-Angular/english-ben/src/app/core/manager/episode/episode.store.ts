import {Injectable} from "@angular/core";
import {Store} from "../../store";
import {EpisodeModel} from "./episode.model";
import {EpisodeManager} from "./episode.manager";

export class EpisodeState {
    loading = false
    pending = false
    closeModal = false
    list: EpisodeModel[] = []
}


@Injectable({providedIn: 'root'})
export class EpisodeStore extends Store<EpisodeState> {

    constructor(private episodeManager:EpisodeManager){
        super(new EpisodeState())
    }
    private mutation_loading(loading:boolean): void {
        this.setState({...this.state,loading });
    }
    private mutation_removeModal(removeModal:boolean): void {
        this.setState({...this.state,closeModal: removeModal });
    }

    private mutation_pending(adding:boolean): void {
        this.setState({...this.state,pending: adding });
    }

    private mutation_add(item:EpisodeModel): void {
        this.setState({...this.state, list : [...this.state.list, item] });
    }

    private mutation_update(id:string,item:EpisodeModel): void {
        this.setState({...this.state, list : this.state.list.map(x => x.id === id ?{...item, id} : x )
        });
    }

    private mutation_fetch_success(newList: EpisodeModel[]): void {
        this.setState({...this.state,list: newList });
    }

    private effect_fetch_request(): void {
        this.mutation_loading(true)
        this.episodeManager.list().then(result=>{
            this.mutation_fetch_success(result)
        }).finally(()=>this.mutation_loading(false))
    }

    private effect_closeModal(): void {
        this.mutation_pending(false)
        setTimeout(()=>{
            this.mutation_removeModal(true)
            setTimeout(()=>{
                this.mutation_removeModal(false)
            },1)
        },500)
    }
    private effect_add(item :EpisodeModel): void {
        this.mutation_pending(true)
        this.episodeManager.add(item).then(id=>{
            this.mutation_add({...item, id})
        }).finally(()=>  this.effect_closeModal())
    }

    private effect_update(id: string, item :EpisodeModel): void {
        this.mutation_pending(true)
        this.episodeManager.update(id, item).then(()=>{
            this.mutation_update(id, item)
        }).finally(()=> this.effect_closeModal())
    }

    action_fetch_request(): void {
        this.effect_fetch_request()
    }

    action_update(id: string,item : EpisodeModel): void {
        this.effect_update(id, item)
    }

    action_add(item : EpisodeModel): void {
        this.effect_add(item)
    }

}
