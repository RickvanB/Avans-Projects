import { getRepository } from 'typeorm';
import { Major as MajorModel } from '../models/major';
import { Major } from '../models/interfaces/major';
import { Student as StudentModel } from '../models/student';
import { StudentPatchRequest, StudentProfilePatchRequest, StudentCVPatchRequest } from '../models/interfaces/student';
import { Controller, Get, Route, Tags, Body, Response, Security, Header, Patch, Request } from 'tsoa';
import { ApiError, ApiResponse } from '../models/interfaces/apiResponse';
import { SpeedmeetJwt, UserType } from '../models/speedmeetJwt';
import config from '../config/index';
import { Timeslot as TimeslotModel } from '../models/timeslot';
import { Timeslot } from '../models/interfaces/timeslot';
import { CompanyStatus } from '../models/interfaces/company';

import * as express from 'express';
import multer from 'multer';
var Readable = require('stream').Readable;

const JWT = require('jsonwebtoken');

@Tags('Students')
@Route('students')
export class StudentController extends Controller {

    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Student niet gevonden' })
    @Security('JWT', ['0', '2'])
    @Get('/{id}')
    public async getStudent(@Header('Authorization') auth: string, id: string): Promise<Major> {
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }
        console.log(speedmeetJwt);
        //Company may only access its own route
        // if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
        //     throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        // }

        const query = getRepository(StudentModel)
            .createQueryBuilder('student')
            .where('student.id = :id', { id: id });

        const student = await query.getOne();

        if (!student) {
            throw new ApiError('NotFoundError', 404, 'Student niet gevonden');
        }
        //@ts-ignore
        return student;
    }

    @Response('401', 'UnauthorizedError', { 'name': 'UnauthorizedError', 'code': '401', 'message': 'Bekijken niet toegestaan' })
    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Major niet gevonden' })
    @Response('400', 'InvalidJWTError', { 'name': 'InvalidJWTError', 'code': '400', 'message': 'JWT is invalide' })
    @Tags('WebSockets')
    @Security('JWT', ['0', '2'])
    @Patch('/{id}')
    public async updateStudentProfile(id: string, @Body() requestBody: StudentProfilePatchRequest, @Header('Authorization') auth: string): Promise<ApiResponse> {
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        if(speedmeetJwt.type == UserType.STUDENT && speedmeetJwt.id?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Wijzigen niet toegestaan');
        }

        //GET student
        const student = await getRepository(StudentModel)
            .createQueryBuilder('student')
            .where('student.id = :id', { id: id })
            .getOne();

        if (!student) {
            throw new ApiError('UnauthorizedError', 401, 'Student niet gevonden');
        }

        student.aboutMe = requestBody.aboutMe;

        await getRepository(StudentModel)
            .save(student);

        return { status: 'Success', message: 'Wijziging succesvol uitgevoerd' };
    }

    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Major niet gevonden' })
    @Security('JWT', ['0', '1', '2'])
    @Get('/{id}/majors')
    public async getStudentMajors(@Header('Authorization') auth: string, id: string): Promise<Major> {
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }
        console.log(speedmeetJwt);
        //Company may only access its own route
        // if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
        //     throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        // }

        const query = getRepository(MajorModel)
            .createQueryBuilder('major')
            .leftJoin('major.students', 'student')
            .where('student.id = :id', { id: id });

        const majors = await query.getOne();

        if (!majors) {
            throw new ApiError('NotFoundError', 404, 'Geen majors gevonden');
        }
        //@ts-ignore
        return majors;
    }

    @Response('401', 'UnauthorizedError', { 'name': 'UnauthorizedError', 'code': '401', 'message': 'Inschrijven niet toegestaan' })
    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Major niet gevonden' })
    @Response('400', 'InvalidJWTError', { 'name': 'InvalidJWTError', 'code': '400', 'message': 'JWT is invalide' })
    @Tags('WebSockets')
    @Security('JWT', ['0', '2'])
    @Patch('/{id}/majors')
    public async updateStudentMajor(id: string, @Body() requestBody: StudentPatchRequest, @Header('Authorization') auth: string): Promise<ApiResponse> {
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }
        console.log(speedmeetJwt);
        // if(speedmeetJwt.type != UserType.STUDENT) {
        //     throw new ApiError('UnauthorizedEror', 401, 'Inschrijven niet toegestaan');
        // }

        //GET student
        const student = await getRepository(StudentModel)
            .createQueryBuilder('student')
            .leftJoinAndSelect('student.major', 'major')
            .where('student.id = :id', { id: id })
            .getOne();

        if (!student) {
            throw new ApiError('UnauthorizedError', 401, 'Aanpassing niet toegestaan');
        }

        const major = await getRepository(MajorModel)
            .createQueryBuilder('major')
            .where('major.id = :id', { id: requestBody.majorId })
            .getOne();

        if (!major) {
            throw new ApiError('UnauthorizedError', 404, 'Major niet gevonden');
        }
        student.major = major;

        await getRepository(StudentModel)
            .save(student);

        return { status: 'Success', message: 'Major succesvol aangepast' };
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Bedrijf niet gevonden'})
    @Security('JWT', ['0','2'])
    @Get('/{id}/timeslots')
    public async getCompanyTimeslots(@Header('Authorization') auth: string, id: string): Promise<Timeslot[]> {
        
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }
        //Company may only access its own route
        if(speedmeetJwt.type == UserType.STUDENT && speedmeetJwt.id?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        }

        const query = getRepository(TimeslotModel)
            .createQueryBuilder('timeslot');

        query.leftJoinAndSelect('timeslot.company', 'company')
            .leftJoinAndSelect('timeslot.round', 'round')
            .leftJoinAndSelect('timeslot.student', 'student')
            .where('company.status = :cStatus', {cStatus: CompanyStatus.PARTICIPATING})
            .andWhere('timeslot.student = :id', {id: id});

        const timeslots = await query.getMany();

        timeslots.forEach((timeslot: Timeslot) => {
            if(!timeslot.shareCv) {
                //@ts-ignore TODO: check if not null
                timeslot.student?.cvPath = null;
            }
        });

        return timeslots;
    }

    //patch
    //pdf file to base64 string on upload
    @Response('401', 'UnauthorizedError', { 'name': 'UnauthorizedError', 'code': '401', 'message': 'Bekijken niet toegestaan' })
    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Major niet gevonden' })
    @Response('400', 'InvalidJWTError', { 'name': 'InvalidJWTError', 'code': '400', 'message': 'JWT is invalide' })
    @Tags('WebSockets')
    @Security('JWT', ['0', '2'])
    @Patch('/{id}/cv')
    public async updateStudentCv(@Request() request: express.Request, id: string, @Body() requestBody: StudentCVPatchRequest, @Header('Authorization') auth: string): Promise<ApiResponse> {
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        if(speedmeetJwt.type == UserType.STUDENT && speedmeetJwt.id?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Wijzigen niet toegestaan');
        }

        //GET student
        const student = await getRepository(StudentModel)
            .createQueryBuilder('student')
            .where('student.id = :id', { id: id })
            .getOne();
        
        if (!student) {
            throw new ApiError('UnauthorizedError', 401, 'Student niet gevonden');
        }

        await this.handleFile(request);

        //Handle Delete
        if(request.file == null){
            student.cv = '';
        }else{
            if(request.file.mimetype != 'application/pdf'){
                throw new ApiError('Conflict', 409, 'Alleen PDF formaat toegestaan');
            }
            let base64File = request.file.buffer.toString('base64');
            student.cv = base64File;
        }

        
        await getRepository(StudentModel)
            .save(student);
        
        return { status: 'Success', message: 'Wijziging succesvol uitgevoerd' };
    }

    private handleFile(request: express.Request): Promise<any> {
        const multerSingle = multer().single('cv');
        return new Promise((resolve, reject) => {
            //@ts-ignore : multer, do not touch
            multerSingle(request, undefined, async (error) => {
                if (error) {
                    reject(error);
                }
                resolve();

            });
        });
    }

    @Security('JWT', ['0', '1', '2'])
    @Get('/{id}/cv')
    public async getStudentCv(@Header('Authorization') auth: string, id: string): Promise<Buffer> {
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        if(speedmeetJwt.type == UserType.STUDENT && speedmeetJwt.id?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Wijzigen niet toegestaan');
        }

        
        const query = getRepository(StudentModel)
            .createQueryBuilder('student')
            .addSelect('student.cv')
            .leftJoinAndSelect('student.timeslots', 'timeslot')
            .leftJoinAndSelect('timeslot.company', 'company')
            .where('student.id = :id', {id: id});

        const student = await query.getOne();

        if(!student){
            throw new ApiError('NotFoundError', 404, 'Cv niet gevonden');
        }
        if(!student.timeslots){
            throw new ApiError('NotFoundError', 404, 'Cv niet gevonden');
        }
        if(!student.cv || student.cv == ''){
            throw new ApiError('NotFoundError', 404, 'Cv niet gevonden');
        }

        
        if(speedmeetJwt.type == UserType.COMPANY) {
            const timeslotIndex = student.timeslots?.map(function(timeslot) {return timeslot.company?.id;}).indexOf(speedmeetJwt.companyId);
            if (!student.timeslots[timeslotIndex].shareCv){
                throw new ApiError('Unauthorized', 401, 'Geen toestemming om CV te bekijken');
            }
        }
        
        const cvPdf = Buffer.from(student.cv, 'base64');

        var filestream = new Readable();

        filestream.push(cvPdf);
        filestream.push(null);

        const fileName = 'CV_' + student.name + '_' + student.lastname + '.pdf';

        this.setHeader('Content-Type', 'application/pdf');
        this.setHeader('Content-Disposition', 'attachment; filename="' + fileName + '"');

        return filestream;
    }
}



