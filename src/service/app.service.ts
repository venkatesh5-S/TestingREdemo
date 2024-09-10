import { Injectable,Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  private readonly logger = new Logger(AppService.name); // Instantiate Logger

  
  getHello(): string {
    this.logger.log('Log message: Getting hello');
    this.logger.error('Error message example');
    this.logger.warn('Warning message example');
    // return 'Hello World!';
    return this.configService.get<string>('DATABASE_PORT');
  }
}
