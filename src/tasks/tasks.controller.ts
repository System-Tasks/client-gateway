import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { TASK_SERVICE } from 'src/config';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { TaskPaginationDto } from './dto/task-pagination.dto';
import { StatusDto } from './dto/status.dto';

@Controller('tasks')
export class TasksController {
  constructor( @Inject(TASK_SERVICE) private readonly tasksClient: ClientProxy,) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksClient.send('createTask', createTaskDto);
  }

  @Get()
  findAll(@Query() taskPaginationDto: TaskPaginationDto) {
    return this.tasksClient.send('findAllTasks', taskPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksClient.send('findOneTask', {id})
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksClient.send('updateTask', {id, ...updateTaskDto})
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksClient.send('removeTask', {id})
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() statusDto: StatusDto) {
    return this.tasksClient.send('changeTaskStatus', {id, ...statusDto})
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }
}
