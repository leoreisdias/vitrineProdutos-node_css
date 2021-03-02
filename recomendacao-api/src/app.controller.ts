import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('recommend')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('')
  getMostPopular(@Query() query) {
    const { maxProducts } = query;
    return this.appService.getRecommendation(maxProducts);
  }
}
