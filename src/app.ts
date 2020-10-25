import express from 'express';
import 'reflect-metadata';
import AppRoutes from './router';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import * as entities from '../src/entity';

export const DEFAULT_PORT = 3000;

/**
 * the main entry function for running the server application.
 * all application endpoint listener should be placed here.
 */
export default async function run() {
    // dynamically load all entities for the database connection
    const schemas = Object.entries(entities).map((keys, _values) => {
        return keys[1];
    });

    createConnection({
        type: 'sqlite',
        database: process.cwd() + '/.db/database.sqlite',
        entities: schemas,
        synchronize: true,
        logging: true,
    }).then(async (connection) => {
        const app = express();
        const port = process.env.PORT || DEFAULT_PORT;

        app.use(express.static(process.cwd() + '/public'));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        // serve a static Swagger API ref page
        app.get('/', (_req, res) => {
            _req.params;
            res.sendFile(process.cwd() + '/public/index.html', { root: process.cwd() });
        });

        // create calls for all get methods
        AppRoutes.filter((i) => i.method === 'GET').map((route) => {
            app.get(route.path, async (req, res) => {
                await route.controller(req, res, connection);
            });
        });

        // create calls for all post methods
        AppRoutes.filter((i) => i.method === 'POST').map((route) => {
            app.post(route.path, async (req, res) => {
                await route.controller(req, res, connection);
            });
        });

        app.listen(port, () => {
            return console.log(`server is listening on http://localhost:${port}`);
        }).on('error', (e) => {
            return console.error(e);
        });
    });
}
