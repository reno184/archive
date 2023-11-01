import { Injectable } from '@angular/core';
import { JreSt, PciInfo } from '@arpege/models';
import * as fromHTTP from '@angular/common/http';
import { Observable } from 'rxjs';
import { SocketArp } from 'src/app/app.socket.service';

@Injectable({
    providedIn: 'root'
})
export class PCIService {
    constructor(private httpClient: fromHTTP.HttpClient, private socket: SocketArp) {
    }

    // todo depreciated
    getAll(): Observable<PciInfo[]> {
        return this.socket.fromEvent('pciToClient');
    }

    getJre(): Observable<JreSt> {
        return this.socket.fromEvent('jreToClient');
    }

}
