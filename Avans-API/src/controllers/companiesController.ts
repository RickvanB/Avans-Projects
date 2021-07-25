import { getRepository } from 'typeorm';
import {Company as CompanyModel} from '../models/company';
import { Company, CompanyBannerPatchRequest } from '../models/interfaces/company';
import { CompanyStatus } from '../models/interfaces/company';
import { CompanyPutPost } from '../models/interfaces/company';
import {Timeslot as TimeslotModel, Timeslot} from '../models/timeslot';
import { Contact as ContactModel } from '../models/contact';
import { Contact, ContactPutPost } from '../models/interfaces/contact';
import io from '../api/websocket/index';
import { Major as MajorModel } from '../models/major';
import { Major, TableMajorsPut } from '../models/interfaces/major';

import { Body, Controller, Get, Put, Post, Delete, Tags, Route, Response, Query, Security, Header, Patch, Request } from 'tsoa';
import { ApiResponse, ApiError } from '../models/interfaces/apiResponse';
import { Round as RoundModel } from '../models/round';
import { Speedmeet as SpeedmeetModel } from '../models/speedmeet';
import { SpeedmeetJwt, UserType } from '../models/speedmeetJwt';
const JWT = require('jsonwebtoken'); 
import config from '../config/index';
import { MajorsPatch } from '../models/interfaces/major';

import * as express from 'express';
import multer from 'multer';

var Readable = require('stream').Readable;


@Tags('Companies')
@Route('Companies')
export class CompaniesController extends Controller {
    @Security('JWT', ['0','2'])
    @Get()
    public async getAllCompanies(@Header('Authorization') auth: string, @Query('majorId') majorId?: number, 
        @Query('status') status?: number): Promise<Company[]> {

        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        if(speedmeetJwt.type == UserType.STUDENT) {
            if(!majorId) {
                throw new ApiError('Unauthorized', 401, 'Studenten moeten een major meegeven');
            }
            if(speedmeetJwt.major?.id != majorId) {
                throw new ApiError('Unauthorized', 401, 'Studenten mogen enkel hun eigen major ophalen');
            }
        }

        const query = getRepository(CompanyModel)
            .createQueryBuilder('company')
            .leftJoin('company.majors', 'majors');
        if(status) {
            query.andWhere('company.status = :status', {status: status});
        }
        if(majorId) {
            query.andWhere('company_majors.majorId = :mId', {mId: majorId});
        }
        const companies = query.getMany();
        return companies;
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Company not found'})
    @Security('JWT', ['0','1','2'])
    @Get('/{id}')
    public async getCompany(@Header('Authorization') auth: string, id: string): Promise<Company> {
        
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        }

        const query = getRepository(CompanyModel)
            .createQueryBuilder('company')
            .where('company.id = :id', {id: id});

        const company = await query.getOne();


        if (!company) {
            throw new ApiError('NotFoundError', 404, 'Company not found');
        }

        //@ts-ignore TODO: Casting
        return company;
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Banner niet gevonden'})
    @Security('JWT', ['0','1','2'])
    @Get('/{id}/banner')
    public async getCompanyBanner(@Header('Authorization') auth: string, id: string): Promise<Company> {
        
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        }

        const query = getRepository(CompanyModel)
            .createQueryBuilder('company')
            .addSelect('company.banner')
            .where('company.id = :id', {id: id});

        const company = await query.getOne();

        if (!company) {
            throw new ApiError('NotFoundError', 404, 'Company not found');
        }

        if (!company.banner) {
            throw new ApiError('NotFoundError', 404, 'Company banner not found');
        }

        const bannerImage = Buffer.from(company.banner, 'base64');

        var filestream = new Readable();

        filestream.push(bannerImage);
        filestream.push(null);

        this.setHeader('Content-Type', 'document');

        return filestream;

        //@ts-ignore TODO: Casting
    }

    //pdf file to base64 string on upload
    @Response('401', 'UnauthorizedError', { 'name': 'UnauthorizedError', 'code': '401', 'message': 'Bekijken niet toegestaan' })
    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Major niet gevonden' })
    @Response('400', 'InvalidJWTError', { 'name': 'InvalidJWTError', 'code': '400', 'message': 'JWT is invalide' })
    @Tags('WebSockets')
    @Security('JWT', ['1', '2'])
    @Patch('/{id}/banner')
    public async updateCompanyBanner(@Header('Authorization') auth: string, @Request() request: express.Request, id: string, @Body() requestBody: CompanyBannerPatchRequest): Promise<ApiResponse> {
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch (err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.id?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Wijzigen niet toegestaan');
        }

        
        //GET student
        const company = await getRepository(CompanyModel)
            .createQueryBuilder('company')
            .where('company.id = :id', { id: id })
            .getOne();
        
        if (!company) {
            throw new ApiError('UnauthorizedError', 401, 'Student niet gevonden');
        }

        await this.handleFile(request);

        //Handle Delete
        if(request.file == null){
            company.banner = '';
        }else{
            if(request.file.mimetype == 'image/jpeg'){
                //save type as jpg
            }else if(request.file.mimetype == 'image/png'){
                //save type as png
            }else{
                throw new ApiError('Conflict', 409, 'Alleen JPG & PNG formaat toegestaan');
            }
            let base64File = request.file.buffer.toString('base64');
            company.banner = base64File;
        }

        await getRepository(CompanyModel)
            .save(company);
        
        return { status: 'Success', message: 'Wijziging succesvol uitgevoerd' };
    }
    
    private handleFile(request: express.Request): Promise<any> {
        const multerSingle = multer().single('banner');
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

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Bedrijf niet gevonden'})
    @Security('JWT', ['0','1','2'])
    @Get('/{id}/contacts')
    public async getContacts(@Header('Authorization') auth: string, id: string): Promise<Contact[]> {
        
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }
        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        }

        const query = await getRepository(CompanyModel)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.contacts', 'contact')
            .where('company.id = :id', {id: id});
            
        const company = await query.getOne();
        if(!company || !company.contacts) {
            throw new ApiError('NotFoundError', 404, 'Bedrijf niet gevonden');
        }

        return company?.contacts;
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Bedrijf niet gevonden'})
    @Security('JWT', ['0','1','2'])
    @Get('/{id}/majors')
    public async getCompanyMajors(@Header('Authorization') auth: string, id: string): Promise<Major[]> {
        
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }
        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        }

        //Other way around
        const query = getRepository(CompanyModel)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.majors', 'major')
            .where('company.id = :id', {id: id});

        const company = await query.getOne();
        console.log(company);

        if(!company) {
            throw new ApiError('NotFoundError', 404, 'Bedrijf niet gevonden');
        }

        if(!company.majors) {
            return [];
        }

        return company.majors;
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Bedrijf niet gevonden'})
    @Security('JWT', ['1','2'])
    @Patch('/{id}/majors')
    public async replaceCompanyMajors(@Header('Authorization') auth: string, id: string, @Body() requestBody: MajorsPatch): Promise<ApiResponse> {
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }
        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        }

        const query = getRepository(CompanyModel)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.majors', 'major')
            .where('company.id = :id', {id: id});

        const company = await query.getOne();

        if(!company) {
            throw new ApiError('NotFoundError', 404, 'Bedrijf niet gevonden');
        }

        if(requestBody.add) {
            //Add majors 
            for (const majorId of requestBody.majorIds) {
                const major = await getRepository(MajorModel)
                    .createQueryBuilder('major')
                    .leftJoin('major.companies', 'companies')
                    .where('major.id = :id', {id: majorId})
                    .getOne();

                if(!major) {
                    throw new ApiError('InvalidRequest', 400, 'Major niet gevonden');
                }

                if(company.majors && company.majors.map(function(major) { return major.id; }).indexOf(major.id) != -1){
                    throw new ApiError('InvalidRequest', 400, 'Major is al toegekend aan dit bedrijf');
                }

                company.majors?.push(major);
                getRepository(CompanyModel).save(company);

                major.companies?.push(company);
                getRepository(MajorModel).save(major);

            }
        } else {
            //Remove majors
            for (const majorId of requestBody.majorIds) {
                const major = await getRepository(MajorModel)
                    .createQueryBuilder('major')
                    .leftJoinAndSelect('major.companies', 'companies')
                    .where('major.id = :id', {id: majorId})
                    .getOne();

                if(!major) {
                    throw new ApiError('InvalidRequest', 400, 'Major niet gevonden');
                }

                if(!company.majors || !major.companies) {
                    throw new ApiError('InvalidRequest', 400, 'Bedrijf heeft geen majors');
                }

                if(company.majors?.map(function(major) { return major.id; }).indexOf(major.id) == -1){
                    throw new ApiError('InvalidRequest', 400, 'Major is niet toegekend dit bedrijf');
                }

                //TODO Afvangen
                const majorIndex = company.majors.map(function(major) { return major.id; }).indexOf(major.id);
                company.majors?.splice(majorIndex, 1);
                console.log(major.companies);
                getRepository(CompanyModel).save(company);
                
                const companyIndex = major.companies.map(function(company) { return company.id; }).indexOf(company.id);
                major.companies?.splice(companyIndex, 1);
                getRepository(MajorModel).save(major);
            }
        }

        return {status: 'success', message: 'Successvol aangepast'};
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Bedrijf niet gevonden'})
    @Security('JWT', ['0','1','2'])
    @Get('/{id}/timeslots')
    public async getCompanyTimeslots(@Header('Authorization') auth: string, id: string, @Query('withLocked') withLocked?: string): Promise<Timeslot[]> {
        
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }
        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        }

        if(speedmeetJwt.type == UserType.STUDENT && withLocked) {
            throw new ApiError('Unauthorized', 401, 'Bekijken gelockte timeslots niet toegestaan');
        }


        const query = getRepository(TimeslotModel)
            .createQueryBuilder('timeslot');

        query.leftJoin('timeslot.company', 'company')
            .leftJoinAndSelect('timeslot.round', 'round')
            .leftJoinAndSelect('timeslot.student', 'student')
            .leftJoinAndSelect('timeslot.excludedMajors', 'excludedMajors')
            .where('company.status = :cStatus', {cStatus: CompanyStatus.PARTICIPATING})
            .andWhere('timeslot.company = :id', {id: id});

        if(withLocked) {
            //Do Nothing
        } else {
            query.andWhere('timeslot.enabled = true');
        }

        const timeslots = await query.getMany();

        timeslots.forEach((timeslot: Timeslot) => {
            if(!timeslot.shareCv) {
                //@ts-ignore TODO: check if not null
                timeslot.student?.cvPath = null;
            }
        });

        return timeslots;
    }

    @Response('401', 'Unauthorized', {'name':'Unauthorized','code':'404','message':'Bekijken niet toegestaan'})
    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Contact niet gevonden'})
    @Security('JWT', ['0','1','2'])
    @Get('/{id}/contacts/{cId}')
    public async getContact(@Header('Authorization') auth: string, 
        id: string, cId: string): Promise<Contact> {

        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Bekijken niet toegestaan');
        }

        const query = await getRepository(ContactModel)
            .createQueryBuilder('contact')
            .leftJoin('contact.company', 'company')
            .where('company.id = :id', {id: id})
            .andWhere('contact.id = :cId', {cId: cId});
            
        const contact = await query.getOne();

        if(!contact) {
            throw new ApiError('NotFoundError', 404, 'Contact niet gevonden');
        }
        return contact;
    }

    @Response('401', 'Unauthorized', {'name':'Unauthorized','code':'401','message':'Wijzigen niet toegestaan'})
    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Contact niet gevonden'})
    @Security('JWT', ['1','2'])
    @Put('/{id}/contacts/{cId}')
    public async replaceContact(@Header('Authorization') auth: string, id: string, cId: string, 
        @Body() requestBody: ContactPutPost): Promise<ApiResponse> {

        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Wijzigen niet toegestaan');
        }

        const query = await getRepository(ContactModel)
            .createQueryBuilder('contact')
            .leftJoin('contact.company', 'company')
            .where('company.id = :id', {id: id})
            .andWhere('contact.id = :cId', {cId: cId});
            
        const contact = await query.getOne();
        if(!contact) {
            throw new ApiError('NotFoundError', 404, 'Contact niet gevonden');
        }

        contact.replace(requestBody);

        const save = await getRepository(ContactModel).save(contact);
        console.log(save);

        return {status: 'success', message: 'Contact is successvol aangepast'};

    }

    @Response('401', 'Unauthorized', {'name':'Unauthorized','code':'401','message':'Verwijderen niet toegestaan'})
    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Contact niet gevonden'})
    @Security('JWT', ['1','2'])
    @Delete('/{id}/contacts/{cId}')
    public async deleteContact(@Header('Authorization') auth: string, id: string, cId: string): Promise<ApiResponse> {
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Verwijderen niet toegestaan');
        }

        const companiesContact = await getRepository(ContactModel)
            .createQueryBuilder('contact')
            .where('contact.companyId = :id', {id: id})
            .andWhere('contact.id = :cId', {cId: cId})
            .getOne();

        if (!companiesContact) {
            throw new ApiError('NotFoundError', 404, 'Contact not found');
        }

        const company = await getRepository(CompanyModel)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.contacts', 'contact')
            .where('company.id = :id', {id: id})
            .getOne();

        const AmountOfContacts = company?.contacts?.length || 0;

        if (AmountOfContacts <= 1) {
            throw new ApiError('ConflictError', 409, 'Verwijderen niet toegestaan, een bedrijf heeft minimaal een contactpersoon nodig.');
        }

        await getRepository(ContactModel)
            .createQueryBuilder('contact')
            .delete()
            .from(ContactModel)
            .where('contact.companyId = :id', {id: id})
            .andWhere('contact.id = :cId', {cId: cId})
            .execute();

        return {status: 'success', message: 'Contact successvol verwijderd'};
    }

    @Security('JWT', ['2'])
    @Post()
    public async createCompany(@Body() requestBody: CompanyPutPost): Promise<Company> {
        const company = new CompanyModel();
        company.status = CompanyStatus.INVITED;
        
        company.replace(requestBody);

        //Create Timeslots
        const rounds = await getRepository(RoundModel)
            .createQueryBuilder('round')
            .getMany();

        const speedmeet = await getRepository(SpeedmeetModel)
            .createQueryBuilder('speedmeet')
            .getOne();

        await getRepository(CompanyModel).save(company);

        var tableAmount = 1;
        if(company.tables != null && company.tables != undefined){
            tableAmount = company.tables;
        }
        for(const round of rounds){
            //for each table
            for(let i = 1; i <= tableAmount; i++){
                const timeslot = new TimeslotModel();
                timeslot.round = round;
                timeslot.company = company;
                timeslot.speedmeet = speedmeet;
                //assign table number
                timeslot.table = i;
                getRepository(TimeslotModel).save(timeslot);
            }
        }

        
        this.setStatus(201);
        return company;
    }

    @Response('401', 'Unauthorized', {'name':'Unauthorized','code':'404','message':'Toevoegen niet toegestaan'})
    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Bedrijf niet gevonden'})
    @Response('409', 'Conflict', {'name':'Conflict','code':'409','message':'Dit emailadres is al gebruikt'})
    @Security('JWT', ['1','2'])
    @Post('/{id}/contacts/')
    public async createCompanyContact(@Header('Authorization') auth: string, 
        id: string, @Body() requestBody: ContactPutPost): Promise<Contact> {

        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Toevoegen niet toegestaan');
        }

        const company = await getRepository(CompanyModel)
            .createQueryBuilder('company')
            .where('company.id = :id', {id: id})
            .getOne();
        
        if(!company){
            throw new ApiError('NotFoundError', 404, 'Bedrijf niet gevonden');
        }

        const checkContact = await getRepository(ContactModel)
            .find({'emailaddress': requestBody.emailaddress});
        
        if(checkContact.length >= 1){
            throw new ApiError('Conflict', 409, 'Dit emailadres is al gebruikt');
        }


        const contact = new ContactModel();
        contact.replace(requestBody);
        contact.company = company;

        
        await getRepository(ContactModel).save(contact);
        io.sockets.in('companies').emit('company_change', company);

        this.setStatus(201);
        return contact;
    }

    @Response('401', 'Unauthorized', {'name':'Unauthorized','code':'404','message':'Wijzigen niet toegestaan'})
    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Bedrijf niet gevonden'})
    @Security('JWT', ['1','2'])
    @Put('/{id}')
    public async replaceCompany(@Header('Authorization') auth: string,
        id: string, @Body() requestBody: CompanyPutPost): Promise<ApiResponse> {
        
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Wijzigen niet toegestaan');
        }

        
        const company = await getRepository(CompanyModel)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.timeslots', 'timeslot')
            .where('company.id = :id', {id: id})
            .getOne();

        if(!company){
            throw new ApiError('NotFoundError', 404, 'Bedrijf niet gevonden');
        }
        if(!requestBody.tables || !company.tables){
            throw new ApiError('NotFoundError', 404, 'Tafels niet gevonden.');
        }
        
        if(requestBody.tables < company.tables){
            //delete timeslots of deprecated tables
            //foreach timeslot of company
            //if timeslot.table < ...
            if(!company.timeslots){
                throw new ApiError('NotFoundError', 404, 'Timeslots niet gevonden.');
            }
         
            //Delete Timeslots for removed tables
            await getRepository(TimeslotModel)
                .createQueryBuilder('timeslot')
                .delete()
                .from(TimeslotModel)
                .where('timeslot.companyId = :id', {id: id})
                .andWhere('timeslot.table > :tbl', {tbl: requestBody.tables})
                .execute();

        }else if(requestBody.tables > company.tables){

            const rounds = await getRepository(RoundModel)
                .createQueryBuilder('round')
                .getMany();

            const speedmeet = await getRepository(SpeedmeetModel)
                .createQueryBuilder('speedmeet')
                .getOne();
            //add timeslots for new tables
            for(const round of rounds){
                //for each table
                //create timeslots for added tables
                for(let i = company.tables+1; i <= requestBody.tables; i++){
                    const timeslot = new TimeslotModel();
                    timeslot.round = round;
                    timeslot.company = company;
                    timeslot.speedmeet = speedmeet;
                    //assign table number
                    timeslot.table = i;
                    getRepository(TimeslotModel).save(timeslot);
                }
            }

        }
        
        company.replace(requestBody);
        await getRepository(CompanyModel).save(company);
        return {status: 'success', message: 'Bedrijf succesvol aangepast'};
     
    }

    

    @Response('401', 'Unauthorized', {'name':'Unauthorized','code':'404','message':'Verwijderen niet toegestaan'})
    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Bedrijf niet gevonden'})
    @Security('JWT', ['1','2'])
    @Delete('/{id}')
    public async deleteCompany(@Header('Authorization') auth: string,
        id: string): Promise<ApiResponse> {
        
        //GET Bearer Token to model
        const token = auth.substring(7);
        let speedmeetJwt: SpeedmeetJwt;
        try {
            speedmeetJwt = JWT.verify(token, config.jwt.secret);
        } catch(err) {
            throw new ApiError('InvalidJWTError', 400, 'JWT is invalide');
        }

        //Company may only access its own route
        if(speedmeetJwt.type == UserType.COMPANY && speedmeetJwt.companyId?.toString() != id) {
            throw new ApiError('Unauthorized', 401, 'Verwijderen niet toegestaan');
        }

        const company = await getRepository(CompanyModel)
            .createQueryBuilder('company')
            .where('company.id = :id', {id: id})
            .getOne();

        if(!company) {
            throw new ApiError('NotFoundError', 404, 'Bedrijf niet gevonden');
        }

        //Delete Contacts
        await getRepository(ContactModel)
            .createQueryBuilder('contact')
            .delete()
            .from(ContactModel)
            .where('contact.companyId = :id', {id: id})
            .execute();

        //Delete Timeslots
        await getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .delete()
            .from(TimeslotModel)
            .where('timeslot.companyId = :id', {id: id})
            .execute();

        //Delete Majors
        const majors = await getRepository(CompanyModel)
            .createQueryBuilder('company')
            .leftJoinAndSelect('company.majors', 'major')
            .where('company.id = :id', {id: id})
            .getOne();

        majors?.majors?.forEach((element: MajorModel) => {
            let index = majors?.majors?.indexOf(element);
            if (!index) return;
            majors?.majors?.splice(index, 1);
        });

        //Delete Company
        await getRepository(CompanyModel)
            .createQueryBuilder('company')
            .delete()
            .from(CompanyModel)
            .where('company.id = :id', {id: id})
            .execute();

        return {status: 'success', message: 'Bedrijf successvol verwijderd'};
    }

    
    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Timeslot niet gevonden' })
    @Security('JWT', ['2'])
    @Patch('/{id}/timeslots')
    public async excludeTimeslotMajorsPerTable(id: String, @Body() requestBody: MajorsPatch, @Query('table') table: String): Promise<ApiResponse> {
        const query = getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .leftJoinAndSelect('timeslot.excludedMajors', 'excludedMajors')
            .leftJoin('timeslot.company', 'company')
            .where('timeslot.table = :tbl', { tbl: table })
            .andWhere('timeslot.company = :cpid', { cpid: id });

        const timeslots = await query.getMany();

        if (!timeslots) {
            throw new ApiError('NotFoundError', 404, 'Timeslot niet gevonden');
        }

        for (const timeslot of timeslots) {

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
                    await getRepository(TimeslotModel).save(timeslot);

                    major.excludedFromTimeslots?.push(timeslot);
                    await getRepository(MajorModel).save(major);

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

                    console.log(timeslot);
                    //TODO Afvangen
                    const majorIndex = timeslot.excludedMajors.map(function (major) { return major.id; }).indexOf(major.id);
                    console.log(majorIndex);
                    timeslot.excludedMajors?.splice(majorIndex, 1);
                    await getRepository(TimeslotModel).save(timeslot);
                    
                    const timeslotIndex = major.excludedFromTimeslots.map(function (timeslot) { return timeslot.id; }).indexOf(timeslot.id);
                    console.log(timeslotIndex);
                    major.excludedFromTimeslots?.splice(timeslotIndex, 1);
                    await getRepository(MajorModel).save(major);
                }
            }
        }


        return { status: 'success', message: 'Successvol aangepast' };
    }

    //{id}/tables GET

    @Get('/{id}/tables')
    public async getCompanyTablesWithExcludedMajors(id: string): Promise<Timeslot[]> {

        //get all distinct tables
        const query = getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .leftJoinAndSelect('timeslot.excludedMajors', 'excludedMajors')
            .select('DISTINCT timeslot.table')
            .addSelect('timeslot_excludedMajors.majorId')
            .leftJoin('timeslot.company', 'company')
            .andWhere('timeslot.company = :cpid', { cpid: id });

        const tablesWithExMajors = await query.getRawMany();

        //@ts-ignore
        let tableArr = [];

        for (const timeslot of tablesWithExMajors) {
            //@ts-ignore
            const arrIndex = timeslot.table -1;
            if(!tableArr[arrIndex]){
                tableArr[arrIndex] = {table: timeslot.table, excludedMajors: [timeslot.majorId]}; 
            }else{
                tableArr[arrIndex].excludedMajors.push(timeslot.majorId);
            }
        }

        //@ts-ignore
        return tableArr;
    }


    @Response('404', 'NotFoundError', { 'name': 'NotFoundError', 'code': '404', 'message': 'Timeslot niet gevonden' })
    // @Security('JWT', ['2'])
    @Put('/{id}/tables/{tId}/majors')
    public async updateExcludedMajorsOfTable(id: String, tId: String, @Body() requestBody: TableMajorsPut): Promise<ApiResponse> {
        //get timeslots with tableId from CompanyID
        const query = getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .leftJoinAndSelect('timeslot.excludedMajors', 'excludedMajors')
            .leftJoin('timeslot.company', 'company')
            .where('timeslot.table = :tbl', { tbl: tId })
            .andWhere('timeslot.company = :cpid', { cpid: id });
        //for each timeslot replace excluded majors in many-to-many

        const timeslots = await query.getMany();

        if (!timeslots) {
            throw new ApiError('NotFoundError', 404, 'Timeslot niet gevonden');
        }

        for(let timeslot of timeslots){
            //replace
            //@ts-ignore
            let majors = [];
            if(requestBody.majorIds.length > 0){
                majors = await getRepository(MajorModel)
                    .createQueryBuilder('major')
                    .where('major.id IN (:majors)', { majors: requestBody.majorIds })
                    .getMany();
            }
            //@ts-ignore
            timeslot.excludedMajors = majors;
            await getRepository(TimeslotModel).save(timeslot);
        }

        // for (const timeslot of timeslots) {

        //     if (requestBody.add) {
        //         //Add majors 
        //         for (const majorId of requestBody.majorIds) {
        //             const major = await getRepository(MajorModel)
        //                 .createQueryBuilder('major')
        //                 .where('major.id = :id', { id: majorId })
        //                 .getOne();

        //             if (!major) {
        //                 throw new ApiError('InvalidRequest', 400, 'Major niet gevonden');
        //             }

        //             if (timeslot.excludedMajors && timeslot.excludedMajors.map(function (major) { return major.id; }).indexOf(major.id) != -1) {
        //                 throw new ApiError('InvalidRequest', 400, 'Major is al toegekend aan dit bedrijf');
        //             }

        //             timeslot.excludedMajors?.push(major);
        //             await getRepository(TimeslotModel).save(timeslot);

        //             major.excludedFromTimeslots?.push(timeslot);
        //             await getRepository(MajorModel).save(major);

        //         }
        //     } else {
        //         //Remove majors
        //         for (const majorId of requestBody.majorIds) {
        //             const major = await getRepository(MajorModel)
        //                 .createQueryBuilder('major')
        //                 .leftJoinAndSelect('major.excludedFromTimeslots', 'excludedFromTimeslots')
        //                 .where('major.id = :id', { id: majorId })
        //                 .getOne();

        //             if (!major) {
        //                 throw new ApiError('InvalidRequest', 400, 'Major niet gevonden');
        //             }

        //             if (!timeslot.excludedMajors || !major.excludedFromTimeslots) {
        //                 throw new ApiError('InvalidRequest', 400, 'Timeslot heeft geen uitgesloten majors');
        //             }

        //             if (timeslot.excludedMajors?.map(function (major) { return major.id; }).indexOf(major.id) == -1) {
        //                 throw new ApiError('InvalidRequest', 400, 'Major is niet uitgesloten van dit timeslot');
        //             }

        //             console.log(timeslot);
        //             //TODO Afvangen
        //             const majorIndex = timeslot.excludedMajors.map(function (major) { return major.id; }).indexOf(major.id);
        //             console.log(majorIndex);
        //             timeslot.excludedMajors?.splice(majorIndex, 1);
        //             await getRepository(TimeslotModel).save(timeslot);
                    
        //             const timeslotIndex = major.excludedFromTimeslots.map(function (timeslot) { return timeslot.id; }).indexOf(timeslot.id);
        //             console.log(timeslotIndex);
        //             major.excludedFromTimeslots?.splice(timeslotIndex, 1);
        //             await getRepository(MajorModel).save(major);
        //         }
        //     }
        // }


        return { status: 'success', message: 'Successvol aangepast' };
    }

}
