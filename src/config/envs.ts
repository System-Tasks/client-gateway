import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
    PROJECTS_MS_HOST: string;
    PROJECTS_MS_PORT: number;
    TASKS_MS_HOST: string;
    TASKS_MS_PORT: number;
    AUTH_MS_HOST: string;
    AUTH_MS_PORT: number;
}

const envSchema = joi.object({
    PORT: joi.number().required(),
    PROJECTS_MS_HOST: joi.string().required(),
    PROJECTS_MS_PORT: joi.number().required(),
    TASKS_MS_HOST: joi.string().required(),
    TASKS_MS_PORT: joi.number().required(),
    AUTH_MS_HOST: joi.string().required(),
    AUTH_MS_PORT: joi.number().required(),
})
.unknown(true);

const { error, value } = envSchema.validate( process.env );

if(error){
    throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
    port: envVars.PORT,
    projectsMsHost: envVars.PROJECTS_MS_HOST,
    projectsMsPort: envVars.PROJECTS_MS_PORT,
    tasksMsHost: envVars.TASKS_MS_HOST,
    tasksMsPort: envVars.TASKS_MS_PORT,
    authMsHost: envVars.AUTH_MS_HOST,
    authMsPort: envVars.AUTH_MS_PORT,
}