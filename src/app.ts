import express from 'express';
import 'reflect-metadata';
import AppRoutes from './router';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
export const API_ROOT = '/v1/lockdrop/';

/**
 * the main entry function for running the server application.
 * all application endpoint listener should be placed here.
 */
export default async function run() {
    createConnection({
        type: 'sqlite',
        database: '.db/database.sqlite',
        entities: ['src/entity/**/*.ts'],
        synchronize: true,
        logging: true,
    }).then(async (connection) => {
        const app = express();
        const port = process.env.PORT || 3000;

        app.use(express.static(process.cwd() + '/public'));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        // serve a static Swagger API ref page
        app.get('/', (_req, res) => {
            _req.params;
            res.sendFile('./public/index.html', { root: process.cwd() });
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
