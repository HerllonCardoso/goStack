import {Request, Response} from 'express';
import './index.ts';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response){
  const user = createUser({
    email: 'herllon@email.com',
    password: 'password',
    techs: ['Node.JS', 'React.JS', 'React Native']
  });

    return response.json({message: "Hello World"})
  }
 