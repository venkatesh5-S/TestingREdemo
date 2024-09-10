import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from './common/logger/logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerConfig), // Use Winston logger
  });

    // Swagger Configuration
    const config = new DocumentBuilder()
    .setTitle('RE2Prime API')
    .setDescription('The API documentation for RE2Prime')
    .setVersion('1.0')
    .addTag('RE2Prime')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // 'api-docs' is the URL for accessing Swagger UI


  await app.listen(3000);
}
bootstrap();
