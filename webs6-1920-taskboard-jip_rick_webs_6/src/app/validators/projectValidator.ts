import { Project } from '../models/project';

export class Projectvalidator {

    /**
     * This method will validate the project object
     * @param project 
     */
    validateProject(project: Project) : string[] {
        var result = []
        if(!project.name || project.name == ""){
            result.push("name")
            return result;
        }
    
        if(!project.status){
            result.push("status")
            return result;
        }
    
        return null;
    }
}
