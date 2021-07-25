import {NextFunction, Request, Response} from 'express';
import { ApiError } from '../../models/interfaces/apiResponse';


export default (req: Request, res: Response, next: NextFunction): void => {
    let error = new ApiError('Not Found', 404, 'The requested page is not found');
    error.status = 404;
    next(error);
};
