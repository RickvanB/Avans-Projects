import { getRepository } from 'typeorm';
import { Timeslot as TimeslotModel } from '../models/timeslot';
import { Timeslot, TimeslotPutPost, TimeslotPatchRequest } from '../models/interfaces/timeslot';
import { Student as StudentModel } from '../models/student';
import { Major as MajorModel } from '../models/major';
import io from '../api/websocket/index';

import { Get, Body, Controller, Patch, Tags, Route, Query, Header, Security, Put, Response } from 'tsoa';
import { ApiResponse, ApiError } from '../models/interfaces/apiResponse';
import { CompanyStatus } from '../models/interfaces/company';
import { SpeedmeetJwt, UserType } from '../models/speedmeetJwt';
const JWT = require('jsonwebtoken');
import config from '../config/index';
import { MajorsPatch } from '../models/interfaces/major';


@Tags('Timeslots')
@Route('Timeslots')
export class TimeslotsController extends Controller {
    @Response('401', 'UnauthorizedEror', { 'name': 'UnauthorizedEror', 'code': '401', 'message': 'Ophalen niet toegestaan' })
    @Security('JWT', ['0', '2'])
    @Get()
    public async getAllTimeslots(@Header('Authorization') auth: string, @Query('available') available: boolean,
        @Query('majorId') majorId?: string): Promise<Timeslot[]> {

        const query = getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .leftJoinAndSelect('timeslot.round', 'round')
            .leftJoinAndSelect('timeslot.student', 'student')
            .leftJoinAndSelect('timeslot.company', 'company')
            .leftJoin('company.majors', 'major')
            .leftJoinAndSelect('timeslot.excludedMajors', 'excludedMajors')
            .where('company.status = :cStatus', { cStatus: CompanyStatus.PARTICIPATING });



        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        if (speedmeetJwt.type == UserType.STUDENT) {
            if (available) {
                throw new ApiError('Unauthorized', 401, 'Studenten mogen niet alle beschikbare tijdsloten ophalen');
            }
            if (!majorId) {
                throw new ApiError('Unauthorized', 401, 'Studenten moeten een major meegeven');
            }
        }

        //ALS Alleen available
        if (available === false) {
            console.log('Not available');
        } else {
            console.log('Available');
            query.andWhere('timeslot.studentId IS NULL');
        }

        if (majorId) {
            query.andWhere('company_major.majorId = :mId', { mId: majorId })
                .andWhere(':majorId NOT IN (SELECT majorId FROM excluded_timeslots_majors WHERE timeslotId = timeslot.id)', { majorId: majorId });
        }

        // if()

        const timeslots = await query.getMany();
        // console.log(time)

        //Remove CVPath if not shared.
        // timeslots.forEach(timeslot => {
        //     if(!timeslot.shareCv) {
        //         //@ts-ignore TODO: Cast
        //         timeslot.student?.cv = null;
        //     }
        // });

        return timeslots;

    }

    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Timeslot niet gevonden' })
    @Security('JWT', ['0', '1', '2'])
    @Get('/{id}')
    public async getTimeslot(id: string): Promise<Timeslot> {
        //TESTED
        const query = getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .leftJoinAndSelect('timeslot.round', 'round')
            .leftJoinAndSelect('timeslot.student', 'student')
            .leftJoinAndSelect('timeslot.company', 'company')
            .where('timeslot.id = :id', { id: id });

        const timeslot = await query.getOne();

        if (!timeslot) {
            throw new ApiError('NotFoundError', 404, 'Timeslot niet gevonden');
        }

        return timeslot;
    }

    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Timeslot niet gevonden' })
    @Security('JWT', ['0', '2'])
    @Put('/{id}')
    public async replaceTimeslot(@Header('Authorization') auth: string, id: string, @Body() requestBody: TimeslotPutPost): Promise<ApiResponse> {
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        //Get Timeslot
        const timeslot = await getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .leftJoinAndSelect('timeslot.student', 'student')
            .leftJoinAndSelect('timeslot.company', 'company')
            .where('timeslot.id = :id', { id: id })
            .getOne();

        if (!timeslot) {
            throw new ApiError('NotFoundError', 404, 'Timeslot niet gevonden');
        }

        if (speedmeetJwt.type == UserType.STUDENT) {
            if (speedmeetJwt.id != timeslot.student?.id) {
                throw new ApiError('UnauthorizedEror', 401, 'Aanpassen niet toegestaan');
            }
        }

        if (requestBody.enabled != null && !requestBody.enabled) {
            if (timeslot.student != null) {
                throw new ApiError('Conflict', 409, 'Timeslot bevat een student');
            }
        }

        timeslot.replace(requestBody);

        await getRepository(TimeslotModel).save(timeslot);
        return { status: 'success', message: 'Successvol aangepast' };
    }

    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Timeslot niet gevonden' })
    @Security('JWT', ['2'])
    @Patch('/{id}/excludedmajors')
    public async excludeTimeslotMajors(id: string, @Body() requestBody: MajorsPatch): Promise<ApiResponse> {
        const query = getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .leftJoinAndSelect('timeslot.excludedMajors', 'excludedMajors')
            .where('timeslot.id = :id', { id: id });

        const timeslot = await query.getOne();

        if (!timeslot) {
            throw new ApiError('NotFoundError', 404, 'Timeslot niet gevonden');
        }

        if (requestBody.add) {
            //Add majors 
            for (const majorId of requestBody.majorIds) {
                const major = await getRepository(MajorModel)
                    .createQueryBuilder('major')
                    .where('major.id = :id', { id: majorId })
                    .getOne();

                if (!major) {
                    throw new ApiError('InvalidRequest', 400, 'Major niet gevonden');
                }

                if (timeslot.excludedMajors && timeslot.excludedMajors.map(function (major) { return major.id; }).indexOf(major.id) != -1) {
                    throw new ApiError('InvalidRequest', 400, 'Major is al toegekend aan dit bedrijf');
                }

                timeslot.excludedMajors?.push(major);
                getRepository(TimeslotModel).save(timeslot);

                major.excludedFromTimeslots?.push(timeslot);
                getRepository(MajorModel).save(major);

            }
        } else {
            //Remove majors
            for (const majorId of requestBody.majorIds) {
                const major = await getRepository(MajorModel)
                    .createQueryBuilder('major')
                    .leftJoinAndSelect('major.excludedFromTimeslots', 'excludedFromTimeslots')
                    .where('major.id = :id', { id: majorId })
                    .getOne();

                if (!major) {
                    throw new ApiError('InvalidRequest', 400, 'Major niet gevonden');
                }

                if (!timeslot.excludedMajors || !major.excludedFromTimeslots) {
                    throw new ApiError('InvalidRequest', 400, 'Timeslot heeft geen uitgesloten majors');
                }

                if (timeslot.excludedMajors?.map(function (major) { return major.id; }).indexOf(major.id) == -1) {
                    throw new ApiError('InvalidRequest', 400, 'Major is niet uitgesloten van dit timeslot');
                }

                //TODO Afvangen
                const majorIndex = timeslot.excludedMajors.map(function (major) { return major.id; }).indexOf(major.id);
                timeslot.excludedMajors?.splice(majorIndex, 1);
                getRepository(TimeslotModel).save(timeslot);

                const timeslotIndex = major.excludedFromTimeslots.map(function (timeslot) { return timeslot.id; }).indexOf(timeslot.id);
                major.excludedFromTimeslots?.splice(timeslotIndex, 1);
                getRepository(MajorModel).save(major);
            }
        }

        return { status: 'success', message: 'Successvol aangepast' };
    }
    
    @Response('401', 'UnauthorizedError', { 'name': 'UnauthorizedError', 'code': '401', 'message': 'Inschrijven niet toegestaan' })
    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Timeslot niet gevonden' })
    @Response('409', 'Conflict', { 'name': 'Conflict', 'code': '409', 'message': 'Er is al een student ingeschreven' })
    @Tags('WebSockets')
    @Security('JWT', ['0'])
    @Patch('/{id}')
    public async updateTimeslot(id: string, @Body() requestBody: TimeslotPatchRequest, @Header('Authorization') auth: string): Promise<ApiResponse> {
        //TESTED 

        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }


        if (speedmeetJwt.type != UserType.STUDENT) {
            throw new ApiError('UnauthorizedEror', 401, 'Inschrijven niet toegestaan');
        }

        //GET student
        const student = await getRepository(StudentModel)
            .createQueryBuilder('student')
            .where('student.id = :id', { id: speedmeetJwt.id })
            .getOne();

        if (!student) {
            throw new ApiError('UnauthorizedEror', 401, 'Inschrijven niet toegestaan');
        }

        //Get Timeslot
        const timeslot = await getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .leftJoinAndSelect('timeslot.student', 'student')
            .leftJoinAndSelect('timeslot.company', 'company')
            .where('timeslot.id = :id', { id: id })
            .getOne();

        if (!timeslot) {
            throw new ApiError('NotFoundError', 404, 'Timeslot niet gevonden');
        }

        if (timeslot.excludedMajors) {
            for (const excludedMajor of timeslot.excludedMajors) {
                if (student.major?.id == excludedMajor.id) {
                    throw new ApiError('UnauthorizedEror', 401, 'Inschrijven niet toegestaan');
                }
            }
        }

        if (requestBody.enroll === true) {
            //Inschrijven
            if (timeslot.student != null) {
                throw new ApiError('Conflict', 409, 'Er is al een student ingeschreven');
            }

            timeslot.student = student;
            timeslot.shareCv = false;
            await getRepository(TimeslotModel)
                .save(timeslot);

            console.info('Student successfully signed in to timeslot: ' + timeslot.id);
            //Only Broadcast in the current company channel
            io.sockets.in('companies/' + timeslot.company?.id).emit('timeslot_change', timeslot);

            return { status: 'Success', message: 'Successvol ingeschreven' };


        } else {
            //Uitschrijven
            if (timeslot.student == null) {
                throw new ApiError('Conflict', 409, 'Er geen student ingeschreven');
            }

            timeslot.student = null;
            timeslot.shareCv = false;
            await getRepository(TimeslotModel)
                .save(timeslot);

            console.info('Student successfully signed out of timeslot: ' + timeslot.id);
            //Only Broadcast in the current company channel
            io.sockets.in('companies/' + timeslot.company?.id).emit('timeslot_change', timeslot);

            return { status: 'Success', message: 'Successvol uitgeschreven' };
        }
    }
}