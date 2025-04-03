import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NeedItemDto } from './dto/need-item.dto';
import { Animal } from '../animal/schema/animal.schema';
import { NeedItemService } from './need-item.service';
import { UpdateNeedItemDto } from './dto/update-need-item.dto';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('animal/:id/needs')
export class NeedItemController {
  constructor(private readonly needItemService: NeedItemService) {}

  @Post()
  @UseGuards(AuthGuard)
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

  @Get(':needId')
  async getOne(
    @Param('id') animalId: string,
    @Param('needId') needId: string,
  ): Promise<NeedItemDto> {
    return this.needItemService.getOne(animalId, needId);
  }

  @Patch(':needId')
  @UseGuards(AuthGuard)
  async updateNeedItem(
    @Param('id') animalId: string,
    @Param('needId') needId: string,
    @Body() updateNeedItemDto: UpdateNeedItemDto,
  ): Promise<UpdateNeedItemDto> {
    return this.needItemService.updateNeedItem(
      animalId,
      needId,
      updateNeedItemDto,
    );
  }

  @Delete(':itemId')
  @UseGuards(AuthGuard)
  async removeNeedItem(
    @Param('id') animalId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.needItemService.removeNeedItem(animalId, itemId);
  }
}
