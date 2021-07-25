import {Connection, createConnection, getConnectionOptions} from 'typeorm';
import { Company } from '../models/company';
import { Timeslot } from '../models/timeslot';
import { Contact } from '../models/contact';
import { Speedmeet } from '../models/speedmeet';
import { Round } from '../models/round';
import { Student } from '../models/student';
import { Major } from '../models/major';
import { Employee } from '../models/employee';

export default function() {
    return new Promise<Connection>((resolve, reject) => {
        getConnectionOptions().then(options => {
            Object.assign(options, {
                entities: [
                    Company,
                    Contact,
                    Timeslot,
                    Speedmeet,
                    Round,
                    Student,
                    Major,
                    Employee
                ]
            });

            createConnection(options).then(connection => {
                resolve(connection);
            });
        });
    });
}
