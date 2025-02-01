import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PROJECT_SERVICE } from 'src/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ProjectsController],
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
    AuthModule
  ]
})
export class ProjectsModule {

  constructor(){
    console.log({envs});
  }
}
