import {Injectable} from "@angular/core";
import {Store} from "../../store";
import {VocabularyModel} from "./vocabulary.model";
import {VocabularyManager} from "./vocabulary.manager";

export class VocabularyState {
    loading = false
    pending = false
    closeModal = false
    list: VocabularyModel[] = []
}

@Injectable({providedIn: 'root'})
export class VocabularyStore extends Store<VocabularyState> {

    constructor(private vocabularyManager:VocabularyManager){
        super(new VocabularyState())
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

    private mutation_add(item:VocabularyModel): void {
        this.setState({...this.state, list : [...this.state.list, item] });
    }

    private mutation_update(id:string,item:VocabularyModel): void {
        this.setState({...this.state, list : this.state.list.map(x => x.id === id ?{...item, id} : x )
        });
    }

    private mutation_fetch_success(newList: VocabularyModel[]): void {
        this.setState({...this.state,list: newList });
    }

    private effect_fetch_request(): void {
        this.mutation_loading(true)
        this.vocabularyManager.list().then(result=>{
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
    private effect_add(item :VocabularyModel): void {
        this.mutation_pending(true)
        this.vocabularyManager.add(item).then(id=>{
            this.mutation_add({...item, id})
        }).finally(()=>  this.effect_closeModal())
    }

    private effect_update(id: string, item :VocabularyModel): void {
        this.mutation_pending(true)
        this.vocabularyManager.update(id, item).then(()=>{
            this.mutation_update(id, item)
        }).finally(()=> this.effect_closeModal())
    }

    action_fetch_request(): void {
        this.effect_fetch_request()
    }

    action_update(id: string,item : VocabularyModel): void {
        this.effect_update(id, item)
    }

    action_add(item : VocabularyModel): void {
        this.effect_add(item)
    }

}
