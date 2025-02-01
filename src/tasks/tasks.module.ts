import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { envs, TASK_SERVICE } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [TasksController],
  providers: [],
  imports: [
      ClientsModule.register([
        { 
          name: TASK_SERVICE, 
          transport: Transport.TCP ,
          options: {
            host: envs.tasksMsHost, 
            port: envs.tasksMsPort
          }
        },
      ]),
    ]
})
export class TasksModule {}
