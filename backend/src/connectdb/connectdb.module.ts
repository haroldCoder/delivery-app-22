import { Global, Module } from '@nestjs/common';
import { ConnectdbService } from './connectdb.service';

@Global()
@Module({
  providers: [...new ConnectdbService().dataProvider],
  exports: [...new ConnectdbService().dataProvider]
})
export class ConnectdbModule {}
