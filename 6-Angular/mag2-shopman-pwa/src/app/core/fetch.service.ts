import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {AuthManager} from './manager/0-auth/auth.manager'
import {LogService} from './log.service'
import {environment} from '../../environments/environment.development'

@Injectable({
    providedIn: 'root'
})
export class FetchService {
    port = '5000'

    constructor(private router: Router, private authService: AuthManager, private logService: LogService) {
    }

    get<T>(path: string): Promise<T> {
        return new Promise((resolve, reject) => {
            const auth = this.authService.getToken()
            if (auth) {
                this.logService.instance?.log('fetch to port: ' + this.port)
                fetch(`${environment.url}/${path}`,
                    {
                        headers: {
                            authorization: this.authService.getToken()
                        }
                    }).then(resp => {

                    if (resp.ok) {
                        resp.json().then(result => resolve(result))
                    } else {
                        resp.json().then(error => {
                            reject(error.msg)
                        })
                    }
                }).catch(err => {
                    reject(err.message)
                })
            } else {
                reject('Http authorization token missing')
            }
        })
    }

    async post2(url: string, body: FormData): Promise<string> {
        console.log('body', body)
        const resp = await fetch(`${environment.url}/${url}`, {
            method: 'POST',
            body: body,
            headers: {
                authorization: this.authService.getToken()
            }
        })
        if (resp.ok) {
            const data = await resp.json()
            return data.insertedId
        } else {
            const error = await resp.json()
            return error.msg
        }
    }

    post<T>(url: string, body: T): Promise<string> {
        return new Promise((resolve, reject) => {
            fetch(`${environment.url}/${url}`, {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: this.authService.getToken()
                }
            }).then(resp => {
                if (resp.ok) {
                    resp.json().then(result => {
                        resolve(result.insertedId)
                    })
                } else {
                    resp.json().then(error => {
                        reject(error.msg)
                    })
                }
            })
        })
    }

    patch<T>(url: string, body: T): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(`${environment.url}/${url}`, {
                method: 'PATCH',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: this.authService.getToken()
                }
            }).then(resp => {
                if (resp.ok) {
                    resolve()
                } else {
                    resp.json().then(error => {
                        reject(error.msg)
                    })
                }
            })
        })
    }

    delete(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fetch(`${environment.url}/${url}`, {
                method: 'delete',
                headers: {authorization: this.authService.getToken()}
            }).then(resp => {
                if (resp.ok) {
                    resolve()
                } else {
                    resp.json().then(error => {
                        reject(error.msg)
                    })
                }
            })
        })
    }
}
