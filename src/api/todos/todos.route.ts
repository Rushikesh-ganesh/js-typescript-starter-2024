import {Router , Request ,Response, NextFunction} from 'express';
import * as TodoHandler from './todos.handler';
import { Todo } from './todos.model';
import { valiadateRequest } from '../../middlewares';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

const router = Router();


router.get('/',TodoHandler.findAll);
router.get('/:id',valiadateRequest({params:ParamsWithId}),TodoHandler.findOne);
router.post('/',valiadateRequest({body:Todo}),TodoHandler.createOne);
router.put('/:id',valiadateRequest({params:ParamsWithId,body:Todo}),TodoHandler.updateOne);
router.delete('/:id',valiadateRequest({params:ParamsWithId}),TodoHandler.deleteOne);


export default router;