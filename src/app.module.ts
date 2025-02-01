import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProjectsModule, TasksModule, AuthModule],
  controllers: [],
  providers: [],
}) 
export class AppModule {}
