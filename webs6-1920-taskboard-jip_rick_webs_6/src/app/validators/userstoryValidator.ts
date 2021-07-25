import { UserStory } from '../models/userStory';

export class userstoryValidator {

    /**
     * Validates a new created user story
     * @param userstory UserStory
     * @return boolean
     */
    validateUserstory(userstory : UserStory) : string[] {

        var result = [];

        if(!userstory.name || userstory.name == "") {
            result.push('name');
            return result;
        }

        if(!userstory.description || userstory.description == "") {
            result.push('description');
            return result;
        }

        if(!userstory.ownerId || userstory.ownerId == "") {
            result.push('ownerId');
            return result;
        }
        
        return null;
    } 

}