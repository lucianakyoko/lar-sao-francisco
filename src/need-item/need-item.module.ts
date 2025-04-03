import { Module } from '@nestjs/common';
import { NeedItemService } from './need-item.service';
import { NeedItemController } from './need-item.controller';
import { AnimalModule } from '../animal/animal.module';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guard/auth.guard';

@Module({
  imports: [AnimalModule, AuthModule],
  providers: [NeedItemService, AuthGuard],
  controllers: [NeedItemController],
})
export class NeedItemModule {}
