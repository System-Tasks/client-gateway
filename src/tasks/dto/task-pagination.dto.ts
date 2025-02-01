import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive } from "class-validator";
import { PaginationDto } from "src/common";
import { TaskStatus, TaskStatusList } from "./enum/task.enum";

export class TaskPaginationDto extends PaginationDto{

    @IsEnum( TaskStatusList , {
        message: `Valid status are ${ TaskStatusList }`
    })
    @IsOptional()
    status: TaskStatus;
}