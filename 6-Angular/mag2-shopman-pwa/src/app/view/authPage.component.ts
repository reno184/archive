import {Component} from '@angular/core'
import {AuthManager} from '../core/manager/0-auth/auth.manager'
import {AuthModel} from '../core/manager/0-auth/auth.model'

@Component({
    selector: 'app-auth',
    template: `
        <style>
            input[type="password"]:focus, input[type="text"]:focus {
                z-index: 1
            }
        </style>
        <div id="card" class="card shadow-sm" style="max-width: 350px; left:50%;top:20%; transform: translateX(-50%)">
            <div class="card-body text-center" *ngIf="auth">
                <img [src]="auth.picture.large" [alt]="auth.name.first" class="img-thumbnail rounded-circle">
                <div class="fs-3 text-nowrap  text-muted">{{auth.name.title}} {{auth.name.first}} {{auth.name.last}}</div>
                <hr>
                <div class="fs-6 text-muted">{{auth.email}}</div>
                <footer>
                    <a [routerLink]="['/app/6-products']" class="btn btn-secondary mt-4">Enter</a>
                </footer>
            </div>
            <div class="card-body text-center" *ngIf="!auth">
                <img src="../../assets/images/log_navy.png" style="width: 100px" alt="logo">
                <form (submit)="onSubmit($event)"
                      class="d-flex flex-column justify-content-center align-items-center my-3">
                    <label for="lblLogin"></label>
                    <input id="lblLogin" type="text" name="login" class="form-control" placeholder="Login"
                           required="required" style="border-bottom-left-radius: 0;border-bottom-right-radius: 0;"
                           autocomplete="off"/>
                    <label for="lblPassword" style="display: none"></label>
                    <input id="lblPassword" type="password" name="password" class="form-control" placeholder="Password"
                           style="border-top: none; border-top-left-radius: 0;border-top-right-radius: 0;"
                           required="required"/>
                    <span *ngIf="pending" class="mt-3 spinner-border spinner-border-sm" role="status"
                          aria-hidden="true"></span>
                    <input type="submit" *ngIf="!pending" class="mt-3 btn btn-secondary btn-sm btn-block"/>
                </form>
            </div>
        </div>
    `,
    styles: []
})
export class AuthPageComponent {
    pending = false
    auth: AuthModel | null = null

    constructor(private authService: AuthManager) {
        this.auth = this.authService.getAuth()
    }

    async onSubmit(e: Event) {
        e.preventDefault()
        this.pending = true
        const form = e.target as HTMLFormElement
        this.authService.signIn(form['login'].value, form['password'].value).then(auth => {
            this.auth = auth
        }).finally(() => {
            this.pending = false
        })
    }
}
