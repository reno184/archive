import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../../../../../shared/service/auth.service";
import {mergeMap, shareReplay} from "rxjs/operators";
import {Question} from "../../../../../shared/model/question";
import {QuestionService} from "../../../../../shared/service/question.service";
import {Reponse} from "../../../../../shared/model/reponse";
import {ReponseService} from "../../../../../shared/service/reponse.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {toogleBlocker} from "../../../../../store/root.action";

@Component({
    selector: 'app-question-detail',
    template: `
        <ng-container *ngIf="user$ | async as user">
            <ng-container *ngIf="params$| async as params">
                <p class="alert alert-warning mx-2 border-dark">
                    <small>
                        <i class="far fa-question-circle mr-1"></i>
                        Ajouter une réponse à une question avec la possibilité d'ajouter un extra, exemple
                        café allongé +30 centimes...
                    </small>
                </p>
                <form [formGroup]="formGroup" (submit)="save(params)" class="mx-2">
                    <div class="input-group">
                        <input type="text" class="form-control" formControlName="name"
                               placeholder="Répo">
                        <input type="number" step="0.05" min="0" class="form-control" formControlName="price">
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="submit" role="button"
                                    [disabled]="formGroup.invalid">
                                Ajouter
                            </button>
                        </div>
                    </div>
                </form>
                <ng-container *ngIf="question$ | async as question">
                    <ng-container *ngIf="reponses$ | async as reponses">
                  

                        <ul class="list-group m-2 m-2 border border-dark" style="max-height: 70vh; overflow-y: auto">
                            <ng-container *ngIf="reponses.length > 0; else noItem">
                                <li *ngFor="let reponse of reponses" class="list-group-item d-flex">

                                <span class="flex-grow-1">
                                    {{reponse.name }}
                                    <ng-container *ngIf="reponse.price >0">
                                        <br>
                                        <small class="text-warning">Extra: {{reponse.price | number:'1.2-2'}}€</small>
                                    </ng-container>
                                </span>
                                    <a (click)="onDelete(params, reponse.id)" role="button"
                                       title="Supprimer"><i class="far fa-minus-circle mr-1"></i></a>
                                </li>
                            </ng-container>
                            <ng-template #noItem>
                                <li class="list-group-item text-center"><i class="far fa-box-open fa-2x"></i></li>
                            </ng-template>
                        </ul>
                        <footer class="text-center">
                            <a [routerLink]="['/', { outlets: { modal: null }}]" [queryParams]="{ 'question-id' : null}"
                               queryParamsHandling="merge"
                               title="close">
                                Annuler</a>
                        </footer>
                    </ng-container>
                </ng-container>
            </ng-container>
        </ng-container>
    `,
    styles: []
})
export class ReponseListComponent implements OnInit {

    formGroup: FormGroup;
    user$: Observable<any>;
    params$: Observable<Params>
    question$: Observable<Question>
    reponses$: Observable<Reponse[]>


    constructor(private activatedRoute: ActivatedRoute,
                private questionService: QuestionService,
                private store: Store<any>,
                private reponseService: ReponseService,
                private authService: AuthService,
                private formBuilder: FormBuilder) {

        this.user$ = this.authService.user;
        this.params$ = this.activatedRoute.queryParams.pipe(shareReplay(1));


        this.question$ = this.params$.pipe(mergeMap(params => this.questionService.findById(params)));
        this.reponses$ = this.params$.pipe(mergeMap(params => this.reponseService.getQuestionReponses(params)));
        this.formGroup = this.formBuilder.group({
            price: 0,
            name: ['', Validators.required]
        })
    }

    ngOnInit(): void {

    }

    onDelete(params: Params, reponseId: string) {
        this.store.dispatch(toogleBlocker({active: true}))
        this.reponseService.removeItem(params['question-id'], reponseId, params['place-id']).finally(() => this.store.dispatch(toogleBlocker({active: false})));
    }


    save(params: Params) {
        this.store.dispatch(toogleBlocker({active: true}))
        this.reponseService.addItem(params['question-id'], this.formGroup.get('name').value, parseFloat(this.formGroup.get('price').value), params['place-id']).finally(() => this.store.dispatch(toogleBlocker({active: false})));
        this.formGroup.reset()
    }

}
