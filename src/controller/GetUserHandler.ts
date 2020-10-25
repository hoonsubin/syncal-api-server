import { Request, Response } from 'express';
import { Connection } from 'typeorm';
import User from '../entity';

export async function getHelloMessage(req: Request, res: Response, database: Connection) {
    const { name } = req.params;

    if (name) {
        const { age, hobby } = req.query;
        res.send(`<h1>Hello ${name}</h1>\nYou're ${age} years old and you love ${hobby}`);
    } else {
        res.status(404).send('No data found!');
    }
}

export async function getUsersByName(req: Request, res: Response, database: Connection) {
    const { firstName } = req.params;
    const userRepo = database.getRepository(User);
    const users = await userRepo.find({ firstName: firstName });
    if (users.length > 0) {
        res.type('application/json');
        res.send(JSON.stringify(users));
    } else {
        res.status(404).send(`User named ${firstName} not found!`);
    }
}
