import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../common/service/auth.service";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {map, startWith} from "rxjs/operators";

@Component({
    selector: 'app-page-login',
    template: `
        <div style="height: 100vh;width: 100vw;" class="d-flex align-items-center justify-content-center bg-light">
            <div class="card shadow-sm" style="width: 300px;margin-top: -200px">
                <header class="text-center  my-3">
                    <img src="../../../../assets/img/android-chrome-192x192.png" alt="logo" style="width:192px">
                </header>
                <div *ngIf="authState$ | async as user" class="card-body text-center">
                    <ng-container *ngIf="user.pending">
                        <i class="far fa-spin fa-spinner"></i>
                    </ng-container>
                    <ng-container *ngIf="!user.pending && !!user.user">
                        <div>{{user.user.email}}</div>
                        <div>
                            <a routerLink="../admin/home" >Enter</a>
                        </div>
                        <button (click)="onLogOff()" class="btn btn-primary">log out</button>
                    </ng-container>
                    <ng-container *ngIf="!user.pending && !user.user">
                        <form [formGroup]="form" (ngSubmit)="onSubmit()" class=" d-flex flex-column align-items-center">
                            <label for="iEmail" style="margin-bottom: 0"></label>
                            <input class="form-control"
                                   formControlName="email" id="iEmail" placeholder="Votre email" required="required"
                                   style="border-bottom-left-radius: 0;border-bottom-right-radius: 0;"
                                   type="email">
                            <label for="iPassword" style="margin-bottom: 0"></label>
                            <input id="iPassword" class="form-control" placeholder="Votre password" type="password"
                                   style="border-top: none; border-top-left-radius: 0;border-top-right-radius: 0;"
                                   formControlName="password" required="required"
                            >
                            <button type="submit" [disabled]="form.invalid"
                                    class="mt-3 btn btn-primary btn-sm btn-block">Valider
                            </button>
                            <div class="text-left text-danger"
                                 *ngIf="form.get('email').invalid && form.get('email').touched">
                                <small *ngIf="form.get('email').errors.required">Email requis</small>
                                <small *ngIf="form.get('email').errors.email">Format email invalide</small>
                            </div>
                            <div class="text-left text-danger"
                                 *ngIf="form.get('password').invalid && form.get('password').touched">
                                <small *ngIf="form.get('password').errors.required">Password requis</small>
                                <small *ngIf="form.get('password').errors.minlength">Password longueur de 6
                                    minimun</small>
                            </div>
                        </form>
                    </ng-container>
                </div>
            </div>
        </div>
    `,
    styles: [`
        input[type="password"]:focus, input[type="email"]:focus {
            z-index: 1
        }
    `]
})
export class PageLoginComponent implements OnInit {

    // todo revoir le design du panel connecté...
    form: FormGroup;
    authState$: Observable<any>;

    constructor(private formBuilder: FormBuilder, private auth: AngularFireAuth, private authService: AuthService) {
        this.authState$ = this.auth.authState.pipe(map(user => {
            return {pending: false, user}
        }), startWith({pending: true}))
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            'email': this.formBuilder.control('renoaide184@yahoo.fr', Validators.compose([Validators.required, Validators.email])),
            'password': this.formBuilder.control('jaijaijai184', Validators.compose([Validators.required, Validators.minLength(6)]))
        });
    }

    onSubmit() {
        this.authService.loginEmailPassword(this.form.get('email').value, this.form.get('password').value)
    }

    onLogOff() {
        this.authService.logoff();
    }

}
