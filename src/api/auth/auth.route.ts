import {Router , Request ,Response, NextFunction} from 'express';
import { checkRoleAndPermission, valiadateRequest } from '../../middelwares/middlewares';
import * as AuthHandler from './auth.handler';
import { User } from './auth.model';

const router = Router();

router.post("/register",valiadateRequest({body:User}),checkRoleAndPermission(['admin']), AuthHandler.register);

export default router;