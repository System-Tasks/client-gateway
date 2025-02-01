import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from 'src/common/interfaces/request.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest<RequestWithUser>();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Token no proporcionado');
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Formato de token inválido');
        }

        try {
            const payload = this.jwtService.verify(token);
            request.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Token inválido o expirado');
        }
    }
}
