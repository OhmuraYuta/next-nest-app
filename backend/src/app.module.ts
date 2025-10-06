import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [TodosModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
