import passport from 'passport';
import express from 'express';
import {NextFunction, Request, Response, Router} from 'express';
import session, {SessionOptions} from 'express-session';
import * as JWT from 'jsonwebtoken';
import {IProfile} from '../../models/interfaces/iProfile';
import config from '../../config';
import * as MySQLStore from 'express-mysql-session';
import { getRepository } from 'typeorm';
import { Major as MajorModel} from '../../models/major';
import { Student } from '../../models/student';
import { ApiError } from '../../models/interfaces/apiResponse';
import { UserType, SpeedmeetJwt } from '../../models/speedmeetJwt';
import { Employee } from '../../models/employee';
const AvansStrategy = require('passport-avans').Strategy;
const MysqlDBStore = require('express-mysql-session')(session);

const store: MySQLStore = new MysqlDBStore({
    port: config.mysql.port,
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

const router: Router = express.Router();

passport.use(new AvansStrategy({
    consumerKey: config.avans.consumer_key,
    consumerSecret: config.avans.consumer_secret,
    callbackURL: config.avans.callback_url,
    userAuthorizationURL: 'https://publicapi.avans.nl/oauth/login.php'
},
async (token: string, tokenSecret: string, profile: IProfile, done: (error: Error|null, profile: IProfile|Student|null) => void) => {

    console.log(profile);

    if (profile.student == 'true') {

        const major = await getRepository(MajorModel)
            .createQueryBuilder('major')
            .where('educationCode = :code', {code: profile.organizations})
            .getOne();

        //Check if user is allowed to log in
        if (!major) {
            return done(new ApiError('Unauthorized', 403, `Student from ${profile.organizations} cannot login`), null);
        }

        let student = await getRepository(Student)
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.major', 'major')
            .where('avansId = :avansId', {avansId: profile.id})
            .getOne();

        if (!student) {
            student = new Student();
        }

        //Update on every login, for if AvansApi Changes
        //TODO: Invalidate routes
        student.name = profile.name.givenName;
        student.lastname = profile.name.familyName;
        student.avansId = profile.id;

        const dbStudent = await getRepository(Student)
            .save(student);

        let studentMajor: string|MajorModel = profile.organizations;
        if(student.major) {
            studentMajor = student.major;
        } 

        //@ts-ignore TODO: Fix Possably Undefined
        let speedmeetJwt: SpeedmeetJwt;
        console.log(dbStudent);
        if(dbStudent.avansId == 'dberkel1' || dbStudent.avansId == 'xpjhjans'){ //xpjhjans jheughten1
            //@ts-ignore TODO: Fix Possably Undefined
            speedmeetJwt = new SpeedmeetJwt(UserType.SUPERADMIN, dbStudent.id, dbStudent.name, dbStudent.lastname, null, null);
        } else {
            //@ts-ignore TODO: Fix Possably Undefined
            speedmeetJwt = new SpeedmeetJwt(UserType.STUDENT, dbStudent.id, dbStudent.name, dbStudent.lastname, studentMajor, null);
        }

        
        const plainSpeedmeetJwt = JSON.parse(JSON.stringify(speedmeetJwt));

        
        return done(null, plainSpeedmeetJwt);
    }
    
    if (profile.employee == 'true') { 

        let employee = await getRepository(Employee)
            .createQueryBuilder('employee')
            .where('avansId = :avansId', {avansId: profile.id})
            .getOne();

        if (!employee) {
            return done(new ApiError('UnAuthorizedError', 401, 'Not Allowed to login'), null);
        }

        employee.name = profile.name.givenName;
        employee.lastname = profile.name.familyName;
        employee.avansId = profile.id;

        await getRepository(Employee)
            .save(employee);

        //@ts-ignore TODO: Fix Possably Undefined
        let speedmeetJwt: SpeedmeetJwt;
        console.log(employee);

        //@ts-ignore TODO: Fix Possably Undefined
        speedmeetJwt = new SpeedmeetJwt(employee.usertype, employee.id, employee.name, employee.lastname, null, null);
        
        const plainSpeedmeetJwt = JSON.parse(JSON.stringify(speedmeetJwt));

        
        return done(null, plainSpeedmeetJwt);
    }

    //Cannot login if not allowed
    done(null, null);
}
));

passport.serializeUser((user: IProfile, done: (error: Error|null, profile: IProfile) => void) => done(null, user));
passport.deserializeUser((profile: IProfile, done: (error: Error|null, profile: IProfile) => void) => done(null, profile));

let sess: SessionOptions = {
    secret: config.session.secret || '',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 3600000,
        secure: process.env.NODE_ENV == 'production' ? true : 'auto'
    },
    store: store
};

router.use(session(sess));
router.use(passport.initialize());
router.use(passport.session());

router.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
    var authHeader = req.headers.authorization;
    if(!authHeader){
        var err = new ApiError('UnAuthorizedError', 401,'you could not be authorized');
        err.status = 401;
        next(err);
        return;
    }
    const token = authHeader.substring(7);
    let refreshJwt: SpeedmeetJwt;
    try {
        //@ts-ignore TODO: Check Config.jwt.secret
        refreshJwt = JWT.verify(token, config.jwt.secret);
    } catch(err) {
        var err = new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        next(err);
        return;
    }
    console.log(refreshJwt);
    //Company may not refresh
    if(refreshJwt.type != UserType.STUDENT) {
        var err = new ApiError('Unauthorized', 401, 'Enkel studenten zijn toegestaan');
        next(err);
        return;
    }

    const educationCode = refreshJwt.major;

    let student = await getRepository(Student)
        .createQueryBuilder('student')
        .leftJoinAndSelect('student.major', 'major')
        .where('student.id = :sId', {sId: refreshJwt.id})
        .getOne();

    if (!student) {
        var err = new ApiError('StudentNotFound', 401, 'Student niet gevonden');
        next(err);
        return;
    }

    if(!student.major?.educationCode) {
        student.major = educationCode;
    } 

    //@ts-ignore TODO: Fix Possably Undefined
    const returnJWT = new SpeedmeetJwt(UserType.STUDENT, student.id, student.name, student.lastname, student.major, null);
    
    //@ts-ignore TODO: Check Config.jwt.secret
    const signedJWT = JWT.sign(JSON.parse(JSON.stringify(returnJWT)), config.jwt.secret);

    res.json({access_token: signedJWT});


});

router.post('/refreshadmin', async (req: Request, res: Response, next: NextFunction) => {
    var authHeader = req.headers.authorization;
    if(!authHeader){
        var err = new ApiError('UnAuthorizedError', 401,'you could not be authorized');
        err.status = 401;
        next(err);
        return;
    }
    const token = authHeader.substring(7);
    let refreshJwt: SpeedmeetJwt;
    try {
        //@ts-ignore TODO: Check Config.jwt.secret
        refreshJwt = JWT.verify(token, config.jwt.secret);
    } catch(err) {
        var err = new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        next(err);
        return;
    }
    console.log(refreshJwt);
    //Company may not refresh
    if(refreshJwt.type == UserType.COMPANY || refreshJwt.type == UserType.STUDENT) {
        var err = new ApiError('Unauthorized', 401, 'Enkel administrators zijn toegestaan');
        next(err);
        return;
    }

    const majorId = req.body.majorId;
    const major = await getRepository(MajorModel)
        .createQueryBuilder('major')
        .where('major.id = :code', {code: majorId})
        .getOne();

    //@ts-ignore TODO: Fix Possably Undefined
    refreshJwt.major = major;
    
    //@ts-ignore TODO: Check Config.jwt.secret
    const signedJWT = JWT.sign(JSON.parse(JSON.stringify(refreshJwt)), config.jwt.secret);

    res.json({access_token: signedJWT});
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    let callback = req.query.callback || req.query.redirect_uri || '';
    let client_id = req.query.client_id || '';

    if (!req.session) {
        res.status(500).send({error: 'Missing session'});
        return;
    }

    req.session.oauth_state = (req.query.state || '');

    // Use custom scheme for android client to App Link or Deeplink
    // @see https://capacitor.ionicframework.com/docs/android/configuration/
    if (client_id && client_id === 'speedmeetand') {
        callback = config.avans.android_callback;
    }

    if (callback) {
        req.session.callback = callback;
    } else {
        res.status(400).send({error: 'Missing callback'});
        return;
    }

    let sessionId = req.session.id;

    let apiCallbackUrl = config.avans.callback_url + '/' + sessionId;

    // @ts-ignore callbackURL is in passport-avans, bus has no .d.ts file
    passport.authenticate('avans', { callbackURL: apiCallbackUrl })(req, res, next);
});

router.get('/callback/:session', async (req: Request, res: Response, next: NextFunction) => {
    
    let sessionId: string = req.params.session;

    store.get(sessionId, (err, session) => {
        Object.assign(req.session, session);

        passport.authenticate('avans', { failureRedirect: '/auth/avans' }, async (err: Error, user: IProfile, info: any) => {
            if (err) {
                next(err);
                return;
            }

            if (!req.session) {
                let error = new ApiError('NoSessionError', 500, 'Missing session');
                next(error);
                return;
            }

            if (!req.session.callback) {
                let error = new ApiError('NoCallbackError', 400, 'Missing callback to redirect to');
                next(error);
                return;
            }

            if (!user) {
                let error = new ApiError('NoUserError', 500, 'Avans authenticatie mislukt');
                next(error);
                return;
            }

            JWT.sign(user, config.jwt.secret || '', (err: Error, token: string) => {
                if (err) {
                    next(err);
                    return;
                }

                if (!req.session) {
                    let error = new ApiError('NoSessionError', 500, 'Missing session');
                    next(error);
                    return;
                }

                let callback = new URL(req.session.callback);
                callback.searchParams.append('access_token', token);

                if (req.session.oauth_state) {
                    callback.searchParams.append('state', req.session.oauth_state);
                }

                res.redirect(callback.toString());
            });
        })(req, res, next);
    });
});

export default router;
