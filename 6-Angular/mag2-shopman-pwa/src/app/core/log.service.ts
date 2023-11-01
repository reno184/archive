import {Injectable} from '@angular/core'
import {Logtail} from '@logtail/browser'
import {Browser} from '@logtail/browser/dist/es6/browser'

@Injectable({
    providedIn: 'root'
})
export class LogService {
    private readonly _instance: Browser | null = null

    constructor() {
        if (!this._instance) {
            this._instance = new Logtail('dRpf11YSVu5GKUHWbpp1CpLB')
        }
    }

    get instance(): Browser | null {
        return this._instance
    }

}
