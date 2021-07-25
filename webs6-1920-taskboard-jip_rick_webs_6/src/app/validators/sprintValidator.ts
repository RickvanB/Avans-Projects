import { Sprint } from '../models/sprint';

export class sprintValidator {

    validateSprint(sprint : Sprint) : string[] {
        
        let result = [];

        if(!sprint.name || sprint.name == "") {
            result.push('name');
            return result;
        }

        if(!sprint.description || sprint.description == "") {
            result.push('description');
            return result;
        }

        if(!sprint.startDate || sprint.startDate == null) {
            result.push('startDate');
            return result;
        }

        if(!sprint.endDate || sprint.endDate == null) {
            result.push('endDate');
            return result;
        }

        if(sprint.startDate > sprint.endDate) {
            result.push('invalid_startdate');
            return result;
        }

        if(!sprint.projectId || sprint.projectId == "") {
            result.push('projectId');
            return result;
        }
        
        return result;
    }

}