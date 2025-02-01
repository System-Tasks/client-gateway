import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PROJECT_SERVICE } from 'src/config';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  constructor( @Inject(PROJECT_SERVICE) private readonly projectsClient: ClientProxy,) {
  }

  @Post()
  createProject(@Body() createProjectDto: CreateProjectDto){
    return this.projectsClient.send({ cmd:'create_project' }, createProjectDto)
  }

  @Get()
  findAllProjects(@Query() paginationDto: PaginationDto){
    return this.projectsClient.send({ cmd:'find_all_projects' }, paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id:number){
    return this.projectsClient.send({ cmd:'find_one_project' }, {id})
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id:number){
    return this.projectsClient.send({ cmd:'delete_project' }, {id})
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }

  @Patch(':id')
  updateProject(@Param('id', ParseIntPipe) id:number, @Body() updateProjectDto: UpdateProjectDto){
    return this.projectsClient.send({ cmd:'update_project' }, {id, ...updateProjectDto})
      .pipe(
        catchError( err => {throw new RpcException(err)} )
      )
  }
}
