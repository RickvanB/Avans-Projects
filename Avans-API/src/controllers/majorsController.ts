import { getRepository } from 'typeorm';
import { Major as MajorModel } from '../models/major';
import { Major, MajorPutPost } from '../models/interfaces/major';
import { Controller, Get, Route, Tags, Post, Body, Delete, Put, Response, Security, Query } from 'tsoa';
import { ApiError, ApiResponse } from '../models/interfaces/apiResponse';

@Tags('Majors')
@Route('Majors')
export class MajorsController extends Controller {
    @Security('JWT', ['0','1','2'])
    @Get()
    public async getAllMajors(@Query('educationCode') educationCode?: string): Promise<Major[]> {
        const query = getRepository(MajorModel)
            .createQueryBuilder('major');
        if(educationCode) {
            query.where('major.educationCode = :code', {code: educationCode});
        }

        const majors = query.getMany();
        //@ts-ignore
        return majors;
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Major niet gevonden'})
    @Security('JWT', ['0','1','2'])
    @Get('/{id}')
    public async getMajor(id: string): Promise<Major> {
        //@ts-ignore TODO: Check Casting
        const query = getRepository(MajorModel)
            .createQueryBuilder('major')
            .where('major.id = :id', {id: id});

        const major = await query.getOne();

        if(!major){
            throw new ApiError('MajorNotFound', 404, 'Major niet gevonden');
        }
        //@ts-ignore TODO: Cast
        return major;
    }

    @Security('JWT', ['2'])
    @Post()
    public async createMajor(@Body() requestBody: MajorPutPost): Promise<Major> {
        const major = new MajorModel();

        major.replace(requestBody);

        await getRepository(MajorModel).save(major);

        this.setStatus(201);

        //@ts-ignore TODO: Cast
        return major;
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Major niet gevonden'})
    @Security('JWT', ['2'])
    @Put('/{id}')
    public async replaceMajor(id: string, @Body() requestBody: MajorPutPost): Promise<ApiResponse> {
        //TESTED
        const major = await getRepository(MajorModel)
            .createQueryBuilder('major')
            .where('major.id = :id', {id: id})
            .getOne();

        if (!major){
            throw new ApiError('NotFoundError', 404, 'Major niet gevonden');
        }
        major.replace(requestBody);
        await getRepository(MajorModel).save(major);
        return {status: 'success', message: 'Major succesvol aangepast'};
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Major niet gevonden'})
    @Security('JWT', ['2'])
    @Delete('/{id}')
    public async deleteMajor(id: string): Promise<ApiResponse> {
        const major = await getRepository(MajorModel)
            .createQueryBuilder('major')
            .where('major.id = :id', {id: id})
            .getOne();

        if(!major){
            throw new ApiError('NotFoundError', 404, 'Major niet gevonden');
        }

        await getRepository(MajorModel)
            .createQueryBuilder('major')
            .delete()
            .from(MajorModel)
            .where('major.id = :id', {id: id})
            .execute();

        return {status: 'success', message: 'Major successvol verwijderd'};
    }
}



