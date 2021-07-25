import { getRepository } from 'typeorm';
import { Round as RoundModel } from '../models/round';
import { Round, RoundPutPost } from '../models/interfaces/round';
import { Company } from '../models/company';
import { Timeslot as TimeslotModel } from '../models/timeslot';
import { Speedmeet } from '../models/speedmeet';
import { ApiResponse, ApiError } from '../models/interfaces/apiResponse';


const timeRegex = /^[012][0-9]:[012345][0-9]$/;
import { Body, Controller, Get, Put, Delete, Tags, Post, Route, Response, Security } from 'tsoa';
import {CompanyStatus} from '../models/interfaces/company';

@Tags('Rounds')
@Route('Rounds')
export class RoundsController extends Controller {
    // @Security('JWT', ['admin'])
    @Security('JWT', ['0','1','2'])
    @Get()
    public async getAllRounds(): Promise<Round[]> {
        return await getRepository(RoundModel)
            .createQueryBuilder('round')
            .orderBy('timestart', 'ASC')
            .getMany();
    }

    @Response('400', 'ValidationError', {'name':'ValidationError','code':'400','message':'Time must be in HH:MM format'})
    @Security('JWT', ['2'])
    @Post()
    public async createRound(@Body() requestBody: RoundPutPost): Promise<Round> {
        if (!timeRegex.test(requestBody.timestart) || !timeRegex.test(requestBody.timeend)) {
            throw new ApiError('Failed', 400, 'Time must be in HH:MM format');
        }
        const round = new RoundModel();
        round.timeend = requestBody.timeend;
        round.timestart = requestBody.timestart;

        await getRepository(RoundModel).save(round);

        const speedmeet = await getRepository(Speedmeet)
            .createQueryBuilder()
            .getOne();

        const companies = await getRepository(Company)
            .createQueryBuilder('company')
            .where('company.status = ' + CompanyStatus.PARTICIPATING)
            .getMany();

        // Create timeslots for all the companies participating the speedmeet
        for (const company of companies) {
            if(company.tables != null) {
                for (let i = 1; i <= company.tables; i++) {
                    const timeslot = new TimeslotModel();
                    timeslot.company = company;
                    timeslot.round = round;
                    timeslot.speedmeet = speedmeet;
                    timeslot.shareCv = false;
                    timeslot.enabled = true;
                    timeslot.table = i;

                    await getRepository(TimeslotModel).save(timeslot);
                }
            }
        }

        this.setStatus(201); // set return status 201
        return Promise.resolve(round);
    }

    @Response('400', 'ValidationError', {'name':'ValidationError','code':'400','message':'Time must be in HH:MM format'})
    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Company not found'})
    @Security('JWT', ['2'])
    @Put('/{id}')
    public async replaceRound(id: string, @Body() requestBody: RoundPutPost): Promise<ApiResponse> {
        //TODO: APIResponse Throw Error
        if (!timeRegex.test(requestBody.timestart) || !timeRegex.test(requestBody.timeend)) {
            throw new ApiError('Failed', 400, 'Time must be in HH:MM format');
        }
        const round = await getRepository(RoundModel)
            .createQueryBuilder('round')
            .where('id = :id', { id: id })
            .getOne();

        if (!round) {
            //throw new ApiError('NotFoundError', 404, 'Round not found');
            this.setStatus(404);
            return {
                status: 'Failed',
                message: 'Round not found'
            };
        }

        round.timestart = requestBody.timestart;
        round.timeend = requestBody.timeend;

        await getRepository(RoundModel).save(round);
        //TODO: Veranderd, Eerst gaf deze round terug.
        return {status: 'Success', message: 'Successfully updated Round'};
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Round not found'})
    @Response('403', 'Forbidden', {'name':'Forbidden','code':'403','message':'Round cannot be deleted when a student has enrolled to an associated timeslot'})
    @Security('JWT', ['2'])
    @Delete('/{id}')
    public async deleteRound(id: string): Promise<ApiResponse> {
        const round = await getRepository(RoundModel)
            .createQueryBuilder('round')
            .leftJoinAndSelect('round.timeslots', 'timeslot')
            .leftJoinAndSelect('timeslot.student', 'student')
            .where('round.id = :id', { id: id })
            .getOne();

        if (!round) {
            throw new ApiError('NotFoundError', 404, 'Round not found');
        }

        if (round.timeslots) {
            // Check if all the timeslots are empty, a round cannot be delete if a student is enrolled to that timeslot
            for (const timeslot of round.timeslots) {
                if (timeslot.student !== null) {
                    throw new ApiError('Forbidden', 403, 'Round cannot be deleted when a student has enrolled to an associated timeslot');
                }
            }
        }

        await getRepository(RoundModel).remove(round);
        this.setStatus(204);
        return {status: 'Success', message: 'Ronde successvol verwijderd'};
    }
}
