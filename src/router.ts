import { Request, Response } from 'express';
import { Connection } from 'typeorm';
import * as controllers from './controller';
/**
 * API path starting from the server address.
 */
export const API_ROOT = '/v1/';

/**
 * basic HTTP methods that will be used for this application
 */
type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE';

interface AppRoute {
    path: string;
    method: HttpMethod;
    controller: (req: Request, res: Response, database: Connection) => Promise<void>;
    reqBody?: Record<string, unknown>;
    reqParams?: Record<string, unknown>;
}

const AppRoutes: AppRoute[] = [
    {
        path: API_ROOT + 'user/:firstName',
        method: 'GET',
        controller: controllers.UserController.getUsersByName,
    },
    {
        path: API_ROOT + 'hello-world/:name',
        method: 'GET',
        controller: controllers.UserController.getHelloMessage,
    },
    {
        path: API_ROOT + 'user/new-user',
        method: 'POST',
        controller: controllers.UserController.createNewUser,
    },
];

export default AppRoutes;
