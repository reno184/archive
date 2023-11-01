import {OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect , OnGatewayConnection} from '@nestjs/websockets';
import {Server} from "socket.io";
import {Logger} from "@nestjs/common";

@WebSocketGateway({  path :'/ws' })
export class MinouGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {

  @WebSocketServer() wss : Server
  private logger: Logger = new Logger('minouGateway');
  users = 0;
  minous : string[];
  afterInit(server: any) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: any, ...args): void {
    this.users++;
    this.minous =[]
    this.logger.log(`connect ${this.users}`);
  }

  handleDisconnect(client: any): void {
    this.users--;
    this.minous =[]
    this.logger.log(`disconnect ${this.users}`);
  }

  @SubscribeMessage('minouToServer')
  handleMessage(client: any, name: string): void {
    this.minous.push(name)
    this.wss.emit('minouToClient',this.minous)
  }
}
