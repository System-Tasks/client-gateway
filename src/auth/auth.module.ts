import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, envs } from 'src/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    controllers: [AuthController],
    imports: [
      ClientsModule.register([
        { 
          name: AUTH_SERVICE, 
          transport: Transport.TCP ,
          options: {
            host: envs.authMsHost, 
            port: envs.authMsPort
          }
        },
      ]),
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
    ],
    providers: [JwtAuthGuard],
    exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
