import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {AuthModel} from './auth.model'
import {GlobalStore} from '../../global.store'
import {environment} from '../../../../environments/environment.development'

@Injectable({
    providedIn: 'root'
})
export class AuthManager {

    constructor(private router: Router, private globalStore: GlobalStore) {
    }

    _parseAuth(strAuth: string): AuthModel {
        const temp = JSON.parse(strAuth)
        return {
            email: temp.user.email,
            picture: {
                large: temp.user.picture.large
            },
            name: {
                title: temp.user.name.title,
                first: temp.user.name.first,
                last: temp.user.name.last
            },
            token: temp.token
        }
    }

    getToken(): string {
        if (localStorage.getItem('auth')) {
            return this._parseAuth(localStorage.getItem('auth') as string).token || 'not found'
        } else {
            return 'not found'
        }
    }

    getAuth(): AuthModel | null {
        if (localStorage.getItem('auth')) {
            return this._parseAuth(localStorage.getItem('auth') as string)
        } else {
            return null
        }
    }

    signIn(login: string, password: string): Promise<AuthModel> {
        return new Promise((resolve, reject) => {
            fetch(`${environment.url}/api/0-auth`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'xmlhttprequest'
                },
                body: JSON.stringify({login, password: password})
            }).then(resp => {
                if (resp.ok) {
                    resp.json().then(data => {
                        const auth = this._parseAuth(JSON.stringify(data))
                        localStorage.setItem('auth', JSON.stringify(data))
                        this.globalStore.action_success('login success')
                        resolve(auth)
                    })
                } else {
                    resp.json().then(error => {
                        this.globalStore.action_error(error.msg)
                        reject()
                    })
                }
            }).catch(err => {
                this.globalStore.action_error(err.message)
                reject()
            })
        })
    }

    signOut(): Promise<void> {
        return new Promise(resolve => {
            localStorage.removeItem('auth')
            this.router.navigate(['/auth']).then(() => {
                this.globalStore.action_success('You are disconnected')
                resolve()
            })
        })
    }
}
