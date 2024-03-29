import { NextFunction, Request, Response } from 'express';

import ErrorResponse from '../interfaces/ErrorResponse';
import { ZodError } from 'zod';
import RequestValidators from '../interfaces/RequestValidator';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function successResponse(req: Request, res: Response, next: NextFunction, data: any, statusCode: number = 200) {
  res.status(statusCode).json({
    success: true,
    statusCode:200,
    data,
  });
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);

  if (err instanceof ZodError) {
    // If it's a ZodError, extract the error details
    const zodErrors: Record<string, any>[] = err.errors.map((error) => {
      return {
        path: error.path.join('.'),
        message: error.message,
      };
    });

    res.json({
      message: 'Validation error',
      errors: zodErrors,
    });
  } else {
    // For other types of errors, send a generic error response
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
  }

}
export function valiadateRequest(validators:RequestValidators){
  return async (req:Request,res:Response,next:NextFunction)=>{
      try {
          if(validators.params){
              const result =  await validators.params.parseAsync(req.params);
          }
          if(validators.query){
              const result =  await validators.query.parseAsync(req.query);
          }
          if(validators.body){
              const result =  await validators.body.parseAsync(req.body);
          }
         next();
      } catch (error) {
          if (error instanceof ZodError ) {
              res.status(422);
          }
          next(error);
      }
  }
}


export function checkRoleAndPermission(allowedRoles: string[])  {
  return (req: Request, res: Response, next: Function) => {
    const { role } = req.body;
    if (allowedRoles.includes(role)) {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
};