import { getRepository } from 'typeorm';
import { Employee as EmployeeModel } from '../models/employee';
import { Employee, EmployeePost } from '../models/interfaces/employee';
import { ApiResponse, ApiError } from '../models/interfaces/apiResponse';


import { Body, Controller, Get, Put, Delete, Tags, Post, Route, Response, Security } from 'tsoa';

@Tags('Admins')
@Route('Admins')
export class AdminController extends Controller {
    // @Security('JWT', ['admin'])
    @Security('JWT', ['2'])
    @Get()
    public async getAllAdmins(): Promise<Employee[]> {
        //@ts-ignore TODO: Fix cast
        return await getRepository(EmployeeModel)
            .createQueryBuilder('employee')
            .getMany();
    }

    @Security('JWT', ['2'])
    @Post()
    public async createAdmin(@Body() requestBody: EmployeePost): Promise<Employee> {

        console.info(requestBody);
        const employee = new EmployeeModel();
        employee.replace(requestBody);

        await getRepository(EmployeeModel).save(employee);
        this.setStatus(201); // set return status 201

        //@ts-ignore TODO: Check if can make assignable
        return Promise.resolve(employee);
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Employee not found'})
    @Security('JWT', ['2'])
    @Put('/{id}')
    public async replaceAdmin(id: string, @Body() requestBody: EmployeePost): Promise<ApiResponse> {
        //TODO: APIResponse Throw Error
        const employee = await getRepository(EmployeeModel)
            .createQueryBuilder('employee')
            .where('id = :id', { id: id })
            .getOne();

        if (!employee) {
            throw new ApiError('NotFoundError', 404, 'Employee not found');
        }

        employee.replace(requestBody);

        await getRepository(EmployeeModel).save(employee);
        return {status: 'Success', message: 'Successfully updated Admin'};
    }

    @Response('404', 'NotFoundError', {'name':'NotFoundError','code':'404','message':'Employee not found'})
    @Security('JWT', ['2'])
    @Delete('/{id}')
    public async deleteAdmin(id: string): Promise<ApiResponse> {
        const employee = await getRepository(EmployeeModel)
            .createQueryBuilder('employee')
            .where('employee.id = :id', { id: id })
            .getOne();

        if (!employee) {
            throw new ApiError('NotFoundError', 404, 'Employee not found');
        }

        await getRepository(EmployeeModel).remove(employee);
        this.setStatus(204);
        return {status: 'Success', message: 'Admin successvol verwijderd'};
    }
}