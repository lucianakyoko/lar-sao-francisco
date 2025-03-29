import { Module } from '@nestjs/common';
import { NeedItemService } from './need-item.service';
import { NeedItemController } from './need-item.controller';
import { AnimalModule } from '../animal/animal.module';

@Module({
  imports: [AnimalModule],
  providers: [NeedItemService],
  controllers: [NeedItemController],
})
export class NeedItemModule {}
