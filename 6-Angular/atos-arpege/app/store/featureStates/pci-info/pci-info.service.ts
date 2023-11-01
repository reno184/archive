import { Injectable } from '@angular/core';
import * as fromHTTP from '@angular/common/http';
import { SocketArp } from 'src/app/app.socket.service';
import { throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoPCIService {
  constructor(private httpClient: fromHTTP.HttpClient, private socket: SocketArp) {
  }

  openChannel() {
    return this.socket.fromEvent('pciToClient').pipe(throttleTime(5000));
  }

}
