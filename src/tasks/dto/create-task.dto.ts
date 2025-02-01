import { IsDate, IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus, TaskStatusList } from "./enum/task.enum";
import { Transform } from "class-transformer";

export class CreateTaskDto {
    
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsDate()
    @IsOptional()
    dateLimit: Date;

    @IsEnum(TaskStatusList,{
        message: `The possible status values are ${TaskStatusList}`
    })
    @IsOptional()
    status: TaskStatus = TaskStatus.PENDING
}
