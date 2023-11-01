import {OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect , OnGatewayConnection} from '@nestjs/websockets';
import {Server, Socket} from "socket.io";
import {Logger} from "@nestjs/common";
import {interval, Subscription} from "rxjs";
import {map, take} from "rxjs/operators";

@WebSocketGateway({  path :'/ws' })
export class LamaGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {

  @WebSocketServer() wss : Server
  private logger: Logger = new Logger('lamaGateway');
  users = 0;
  sub : Subscription;
  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: any, ...args): void {
    this.users++;
    this.logger.log(`connect ${this.users}`);
    client.join('lama');
    this.sub = interval(1000).pipe(map((x)=>'lama '+x)).subscribe(x=>  this.wss.to('lama').emit('lamaToClient',x))
  }

  handleDisconnect(client: any): void {
    this.users--;
    this.logger.log(`disconnect ${this.users}`);
    this.sub.unsubscribe();
  }


  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string ) {
    client.join('lama');

  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string ) {
    client.leave('lama');
  }

}
