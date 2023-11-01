import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {filter, map, mergeMap, shareReplay, tap} from "rxjs/operators";
import {ActivatedRoute, Params} from "@angular/router";
import {ArticleService} from "../../shared/service/article.service";
import {Article} from "../../shared/model/article";
import {AuthService} from "../../shared/service/auth.service";
import {toogleBlocker} from "../../store/root.action";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-modal-article-detail',
  template: `
      <ng-container *ngIf="user$ | async" >
       <ng-container *ngIf="params$ | async as params" >
           <h4 class="text-center">
          <ng-container *ngIf="article$ | async as article;else noArticle" >
            {{article.name}}
          </ng-container>    
           <ng-template #noArticle>
               Nouvelle article
           </ng-template>
           </h4>
              <form [formGroup]="formGroup" class="p-2" (submit)="onSave(params)">
                  <div class="form-group">
                      <label for="iName">Libelle</label>
                      <input type="text" class="form-control" formControlName="name" id="iName" placeholder="name">
                  </div>
                  <div class="form-group">
                      <label for="iDesc">Description</label>
                      <input type="text" class="form-control"  formControlName="desc" id="iDesc" placeholder="Description">
                  </div>
                
                  <footer class="d-flex justify-content-around mt-4">
                      <a [routerLink]="['/', { outlets: { modal: null }}]"
                         [queryParams]="{ 'article-id' : null}"
                         queryParamsHandling="merge"
                         title="close" class="btn btn-secondary" >Annuler</a>
                      <button type="submit" class="btn btn-primary">Valider</button>
                  </footer>
              </form>
         
          </ng-container>
      </ng-container>
  `,
  styles: [
  ]
})
export class ModalArticleDetailComponent implements OnInit {
    article$ : Observable<Article>;
    params$ : Observable<Params>;
    user$: Observable<any>;

    formGroup : FormGroup;

  constructor(private store : Store, private formBuilder : FormBuilder,private authService : AuthService, private activatedRoute : ActivatedRoute, private articleService : ArticleService) {
      this.params$ =this.activatedRoute.queryParams;
      this.user$ = this.authService.user;
      this.formGroup = this.formBuilder.group({
          name: ['', Validators.required],
          desc: ['']
      });
      this.article$ = this.params$.pipe(mergeMap(params => this.articleService.findById(params).pipe(filter(article => !!article),tap(article=>{

          this.formGroup.get('name').patchValue(article.name)
          this.formGroup.get('desc').patchValue(article.desc)
      }))));


  }

  ngOnInit(): void {
  }

onSave(params: Params) {
    this.store.dispatch(toogleBlocker({active: true}))
    this.articleService.upsertItem(params, this.formGroup.get('name').value, this.formGroup.get('desc').value).finally(() => this.store.dispatch(toogleBlocker({active: false})));
    this.formGroup.reset()
    }
}
