import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NeedItemDto } from './dto/need-item.dto';
import { Animal } from '../animal/schema/animal.schema';
import { NeedItemService } from './need-item.service';

@Controller('animal/:id/needs')
export class NeedItemController {
  constructor(private readonly needItemService: NeedItemService) {}

  @Post()
  async addNeedItem(
    @Param('id') animalId: string,
    @Body() needItemDto: NeedItemDto,
  ): Promise<Animal> {
    return this.needItemService.addNeedItem(animalId, needItemDto);
  }

  @Get()
  async getAllNeedItems(@Param('id') animalId: string): Promise<NeedItemDto[]> {
    return this.needItemService.getAllNeedItems(animalId);
  }
}
