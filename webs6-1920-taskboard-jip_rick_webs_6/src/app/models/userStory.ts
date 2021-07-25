import { User } from './user';
import { Sprint } from './sprint';

export interface UserStory {
    id:                      string;
    name:                    string;
    description:             string;
    status:                  number;
    storyPoints:             number;
    isArchived:              boolean;
    owner:                   User;
    ownerId:                 string;
    sprint:                  Sprint;
    sprintId:                string;
    taskOf:                  User;
    taskOfId:                string;
    movedToDone?:            Date;
}