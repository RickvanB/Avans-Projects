import {NextFunction, Request, Response} from 'express';
import { ApiError } from '../../models/interfaces/apiResponse';


export default (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
    const status = err.status || 404;
    res.status(status).send(err);
};
