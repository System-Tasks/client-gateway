import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus, TaskStatusList } from "./enum/task.enum";

export class CreateTaskDto {
    
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsOptional()
    dateLimit: string;

    @IsEnum(TaskStatusList,{
        message: `The possible status values are ${TaskStatusList}`
    })
    @IsOptional()
    status: TaskStatus = TaskStatus.PENDING

    @IsString()
    @IsOptional()
    projectId: string
}
