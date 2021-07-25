import { Project } from './project';
import { UserStory } from './userStory';

export interface User {
    id:                      string;
    email:                   string;
    fullName:                string;
    photoURL?:               string;
    role:                    string;
    projects:                Project[],
}