import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PROJECT_SERVICE } from 'src/config';

@Module({
  controllers: [ProjectsController],
  providers: [],
  imports: [
    ClientsModule.register([
      { 
        name: PROJECT_SERVICE, 
        transport: Transport.TCP ,
        options: {
          host: envs.projectsMsHost, 
          port: envs.projectsMsPort
        }
      },
    ]),
  ]
})
export class ProjectsModule {

  constructor(){
    console.log({envs});
  }
}
