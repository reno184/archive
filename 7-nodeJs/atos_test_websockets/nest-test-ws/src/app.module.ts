import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MinouGateway} from "./features/minou.gateway";
import {ToutouGateway} from "./features/toutou.gateway";
import {LamaGateway} from "./features/lama.gateway";


@Module({
  controllers: [AppController],
  providers: [AppService, ToutouGateway, MinouGateway, LamaGateway],

})
export class AppModule {}
