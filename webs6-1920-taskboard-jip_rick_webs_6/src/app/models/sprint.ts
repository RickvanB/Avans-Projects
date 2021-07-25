import { UserStory } from './userStory'
import { Project } from './project';
export interface Sprint {
    id:                      string;
    name:                    string;
    description:             string;
    isActive:                boolean;
    startDate:               Date;
    endDate:                 Date;
    project:                 Project;
    projectId:               string;
    userstories?:             UserStory[];
}