import {Request, Response} from 'express';

export function blabla(request : Request, response : Response){
  return response.json({message: "Hello GoStack!"})
}