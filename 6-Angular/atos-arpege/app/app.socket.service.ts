import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketArp {
  private socket: Socket;

  public initSocket(urlloc: string): void {
    this.socket = new Socket({ url: urlloc, options: { path: '/ws' } });
  }

  public fromEvent<T>(event: string): Observable<T> {
    return this.socket.fromEvent(event);
  }

  public destroy() {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = undefined;
    }
  }

}
