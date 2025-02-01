import { IsEnum, IsOptional } from "class-validator";
import { TaskStatus, TaskStatusList } from "./enum/task.enum";

export class StatusDto {

    @IsOptional()
    @IsEnum( TaskStatusList , {
        message: `Valid status are ${ TaskStatusList }`
    })
    status: TaskStatus;
}