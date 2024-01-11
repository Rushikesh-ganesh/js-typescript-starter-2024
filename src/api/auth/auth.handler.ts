import {Router , Request ,Response, NextFunction} from 'express';
import { InsertOneResult, ObjectId } from 'mongodb';
import { ZodError } from 'zod';
import { ParamsWithId } from '../../interfaces/ParamsWithId';
import { successResponse } from '../../middelwares/middlewares';
import { Users } from './auth.model';

export async function register(req:Request,res:Response,next:NextFunction){
    const { username, email, password, role } = req.body;
    const existedUser = await Users.findOne({
        $or: [{ username }, { email }],
      });

      console.log("existedUser ",existedUser)
    // Check if username or email is already registered
    if (existedUser) {
      return res.status(409).json({ error: 'Username or email already registered' });
    }
    const insertResult = await Users.insertOne(req.body);
    if(!insertResult.acknowledged){
        throw new Error(`Error Inserting Todo`)
    }

    successResponse(req, res, next,
        {
           data: {
            _id :insertResult.insertedId,
            ...req.body
           }
         });
}
