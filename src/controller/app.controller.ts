import { Controller, Get } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
@ApiTags('RE2Prime') 
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a welcome message' })
  @ApiResponse({ status: 200, description: 'Returns a welcome message.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
