import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {AngularFireAuth} from "@angular/fire/auth";


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public authService: AuthService, public router: Router, private auth: AngularFireAuth) {
    }

    canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
        return new Promise((resolve) => {
            this.auth.authState.subscribe(user => {
                if (!!user) {
                    this.authService.getTokenResult(true).then(result => {
                        if (result.claims && result.claims.role && route.data && (route.data.role.toLowerCase() === result.claims.role.toLowerCase())) {
                            resolve(true)
                        } else {
                            this.router.navigate(['/']).then(() => {
                                resolve(false)
                            })
                        }
                    })
                } else {
                    this.router.navigate(['/']).then(() => {
                        resolve(false)
                    })
                }
            })
        });
    }
}
