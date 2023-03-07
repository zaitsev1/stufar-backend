import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { PrismaModule } from 'nestjs-prisma';

import { loggingMiddleware } from '@common/middleware/prisma-logging.middleware';

@Module({
  imports: [
    HttpModule.register({}),

    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),

    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        middlewares: [loggingMiddleware(new Logger('PrismaMiddleware'))], // configure your prisma middleware
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
