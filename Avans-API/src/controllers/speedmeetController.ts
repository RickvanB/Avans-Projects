import { getConnection } from 'typeorm';
import { getRepository } from 'typeorm';
import {Speedmeet as SpeedmeetModel} from '../models/speedmeet';
import {Company as CompanyModel} from '../models/company';
import {Timeslot as TimeslotModel} from '../models/timeslot';
import { Student as StudentModel } from '../models/student';
import { Round as RoundModel } from '../models/round';
import { Major as MajorModel } from '../models/major';




import {Speedmeet} from '../models/interfaces/speedmeet';
import io from '../api/websocket/index';

import { Body, Controller, Get, Put, Tags, Response, Route, Security, Patch, Request, Post } from 'tsoa';
import { ApiResponse, ApiError } from '../models/interfaces/apiResponse';
import { base64Helper } from '../helpers/base64';
import * as express from 'express';
import multer from 'multer';
import { CompanyStatus } from '../models/interfaces/company';

@Tags('Speedmeet')
@Route('Speedmeet')
export class SpeedmeetController extends Controller {
    @Security('JWT', ['0','1','2'])
    @Get()
    public async get(): Promise<Speedmeet> {
        //@ts-ignore TODO: Handle Undefined
        return await getRepository(SpeedmeetModel)
            .createQueryBuilder('speedmeet')
            .getOne();
    }

    @Response('x-WS', 'Room: global | Event: speedmeet_change', {id: 1,start: '2020-03-03 09:00:00',end: '2020-03-03 17:00:00',title: 'string',description: 'string',welcomeMessage: 'string',enrollmentStart: 'string',mapPath: null,maxEnrollmentsPerStudent: 3})
    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Speedmeet bestaat niet'})
    @Put()
    @Security('JWT', ['2'])
    @Tags('WebSockets')
    public async replaceSpeedmeet(@Body() requestBody: Speedmeet): Promise<ApiResponse> {
        const speedmeet = await getConnection().manager.findOne(SpeedmeetModel);
        if(speedmeet !== undefined){
            speedmeet.replace(requestBody);
    
            await getConnection().manager.save(speedmeet);
    
            io.sockets.in('global').emit('speedmeet_change', speedmeet);
            console.log(speedmeet);
    
            return {status: 'success', message: 'Speedmeet succesvol aangepast'};
    
        }
        throw new ApiError('failed', 404, 'Speedmeet bestaat niet');
    }

    @Security('JWT', ['0', '1', '2'])
    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Map path niet gevonden'})
    @Get('/map')
    public async getMap() {
        const speedmeet = await getRepository(SpeedmeetModel)
            .createQueryBuilder('speedmeet')
            .getOne();

        if (speedmeet?.mapPath == undefined) {
            throw new ApiError('NotFoundError', 404, 'Map path niet gevonden');
        }

        this.setHeader('Content-Type', 'document');
        return base64Helper.base64ToImage(speedmeet.mapPath);
    }

    @Security('JWT', ['2'])
    @Patch('/map')
    public async updateMap(@Request() request: express.Request): Promise<ApiResponse> {
        await this.handleFile(request);
        
        const speedmeet = await getRepository(SpeedmeetModel)
            .createQueryBuilder('speedmeet')
            .getOne();

        if (speedmeet == undefined) {
            throw new ApiError('NotFoundError', 404, 'Speedmeet niet gevonden');
        }

        //Handle Delete
        if(request.file == null){
            speedmeet.mapPath = '';
        }else{
            if(request.file.mimetype == 'image/jpeg'){
                //save type as jpg
            }else if(request.file.mimetype == 'image/png'){
                //save type as png
            }else{
                throw new ApiError('Conflict', 409, 'Alleen JPG & PNG formaat toegestaan');
            }
            speedmeet.mapPath = base64Helper.imageToBase64(request.file.buffer);
        }

        await getRepository(SpeedmeetModel)
            .save(speedmeet);

        return { status: 'Success', message: 'Kaart succesvol aangepast' };
    }

    private handleFile(request: express.Request): Promise<any> {
        const multerSingle = multer().single('map');
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

    @Security('JWT', ['3'])
    @Post('/reset')
    public async resetSpeedmeetData(@Request() request: express.Request): Promise<ApiResponse> {
        
        //delete or empty all timeslots
        await getRepository(TimeslotModel)
            .createQueryBuilder('timeslot')
            .delete()
            .from(TimeslotModel)
            .execute();
        
        //remove all student data
        await getRepository(StudentModel)
            .createQueryBuilder('student')
            .delete()
            .from(StudentModel)
            .execute();
        
        //re generate timeslots for each round en each amount of tables
        const companies = await getRepository(CompanyModel)
            .createQueryBuilder('company')
            .getMany();
        
        const rounds = await getRepository(RoundModel)
            .createQueryBuilder('round')
            .getMany();

        const speedmeet = await getRepository(SpeedmeetModel)
            .createQueryBuilder('speedmeet')
            .getOne();
        //for each company
        for (const company of companies) {
            //for each table
            if(company.tables != undefined){
                for(var tablenr = 1; tablenr <= company.tables; tablenr++){
                    //for each round
                    for(const round of rounds){
                        //create timeslot
                        var timeslot = new TimeslotModel();
                        timeslot.company = company;
                        timeslot.table = tablenr;
                        timeslot.round = round;
                        timeslot.speedmeet = speedmeet;
                        getRepository(TimeslotModel).save(timeslot);
                    }
                }
            }
        }

        //set all companies from participates to registered
        await getConnection()
            .createQueryBuilder()
            .update(CompanyModel)
            .set({ status:  CompanyStatus.REGISTERED})
            .where('status = :status', { status: CompanyStatus.PARTICIPATING })
            .execute();

        //remove all majors
        await getRepository(MajorModel)
            .createQueryBuilder('major')
            .delete()
            .from(MajorModel)
            .execute();

        return { status: 'Success', message: 'Speedmeet reset succesvol uitgevoerd!' };
    }



    
}