import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.APP_PORT || 2006;
  const config = new DocumentBuilder()
    .setTitle('Mongoose')
    .setDescription('Introduction mongoose with nestJs')
    .setVersion('1.0')
    .addTag('Mongoose')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  await app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
    console.log(`http://localhost:${PORT}/docs`);
  });
}
bootstrap();
