import { Controller, Post, Body, Patch, Inject, Get } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AUTH_SERVICE } from 'src/config';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { catchError } from 'rxjs';
import { CreateTeamDto } from './dto/create-team.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authClient.send('registerUser', createUserDto)
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authClient.send('loginUser', loginUserDto)
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }

  @Patch()
  addUserToTeam(@Body() data: { userId: string; teamId: string }) {
    return this.authClient.send('addUserToTeam', data)
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }

  @Post('team')
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.authClient.send('createTeam', createTeamDto)
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }

  @Get('users')
  findAllUsers() {
    return this.authClient.send('findAllUsers', {})
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }
}
