import passport from 'passport';
import passportJwt from 'passport-jwt';
import config from './index';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ApiError } from '../models/interfaces/apiResponse';

const p = new passport.Authenticator();

p.use(new passportJwt.Strategy({
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
}, (jwtPayload, cb) => {
    return cb(null, jwtPayload);
}));

// export const expressAuthentication = passport.authenticate('jwt', {session: false});
export function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
        let token = request.get('Authorization');

        if (!token) {
            return reject(new Error('Missing jwt'));
        }

        token = token.replace('Bearer', '').trim();

        jwt.verify(token, config.jwt.secret || '', (err, decoded) => {
            if (err) return reject(err);
            if (scopes) {
                //@ts-ignore TODO 
                if(scopes.includes(''+decoded.type) || decoded.type == '3') { //OR user is super admin
                    return resolve(decoded);
                }
                throw new ApiError('Unauthorized', 401, 'Dit type gebruiker heeft geen toegang');

            }
            resolve(decoded);
        });
    });
}
export default p;
