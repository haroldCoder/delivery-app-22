import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectdbModule } from './connectdb/connectdb.module';
import { ConfigModule } from "@nestjs/config"
import { DeliveryModule } from './delivery/delivery.module';

@Module({
  imports: [ConnectdbModule, ConfigModule.forRoot(), DeliveryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
