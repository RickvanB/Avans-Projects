import {NextFunction, Request, Response, Router} from 'express';
import {sign} from 'jsonwebtoken';
import express from 'express';
import config from '../../config';
import { getRepository } from 'typeorm';
import { ApiError } from '../../models/interfaces/apiResponse';
import { Contact as ContactModel } from '../../models/contact';
import { SpeedmeetJwt, UserType } from '../../models/speedmeetJwt';
import * as bcrypt from 'bcrypt';

const router: Router = express.Router();

router.post('/', async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.emailaddress) {
        var err = new ApiError('ValidationError', 400, 'Emailaddress mist');
        err.status = 404;
        next(err);
        return;
    }
    if (!req.body.password) {
        var err = new ApiError('ValidationError', 400, 'Wachtwoord mist');
        err.status = 404;
        next(err);
        return;
    }

    const contact = await getRepository(ContactModel)
        .createQueryBuilder('contact')
        .addSelect('contact.password')
        .leftJoinAndSelect('contact.company', 'company')
        .where('contact.emailaddress = :email', {email: req.body.emailaddress})
        .getOne();

    if(!contact || !contact.password) {
        var err = new ApiError('NotFoundError', 404, 'Gebruiker niet gevonden');
        next(err);
        return;
    }

    const canlogin = bcrypt.compareSync(req.body.password, contact.password);

    if(!canlogin) {
        var err = new ApiError('UnauthorizedError', 401, 'Wachtwoord klopt niet');
        next(err);
        return;
    }

    if(!contact.id) {
        //@ts-ignore TODO: Fix Message
        throw new ApiError('NotFoundError', 404, 'jos');
    }

    //@ts-ignore TODO: Fix Possably Undefined
    const speedmeetJwt = new SpeedmeetJwt(UserType.COMPANY, contact.id, contact.name, contact.lastname, null, contact.company.id);
    
    const plainSpeedmeetJwt = JSON.parse(JSON.stringify(speedmeetJwt));

    sign(plainSpeedmeetJwt, config.jwt.secret || '', (err: Error, token: string) => {
        if (err) {
            console.log(err);
            next(err);
            return;
        }
        res.status(200);
        return res.json({access_token: token});
    });

});

export default router;
