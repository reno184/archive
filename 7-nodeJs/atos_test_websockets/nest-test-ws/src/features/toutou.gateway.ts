import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Server} from "socket.io";
import {Logger} from "@nestjs/common";

@WebSocketGateway({path: '/ws'})
export class ToutouGateway implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection {

    @WebSocketServer() wss: Server
    private logger: Logger = new Logger('toutouGateway');
    users = 0;
    toutous: string[];

    afterInit(server: any) {
        this.logger.log('Initialized!');
    }

    handleConnection(client: any, ...args): void {
        this.users++;
        this.toutous = []
        this.logger.log(`connect ${this.users}`);
    }

    handleDisconnect(client: any): void {
        this.users--;
        this.toutous = []
        this.logger.log(`disconnect ${this.users}`);
    }

    @SubscribeMessage('toutouToServer')
    handleMessage(client: any, name: string): void {
        this.toutous.push(name)
        this.wss.emit('toutouToClient', this.toutous)
    }

}
