import { Request, Response } from 'express';
import { Connection } from 'typeorm';
import User from '../entity';

export async function createNewUser(req: Request, res: Response, database: Connection) {
    if (req.body) {
        const userRepo = database.getRepository(User);
        const newUser = new User();
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.age = req.body.age;

        await userRepo.save(newUser);
        res.type('application/json');
        res.send(JSON.stringify({ status: 200, message: 'successfully saved new user ' + newUser.firstName }));
    } else {
        res.send('No content body provided');
    }
}
