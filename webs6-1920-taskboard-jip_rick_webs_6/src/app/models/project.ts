import { User } from './user'
import { Participant } from './participant';
import { Sprint } from './sprint';
export interface Project {
    id:                      string;
    name:                    string;
    description:             string;
    status:                  string;
    owner:                   User;
    ownerId:                string;
    isArchived:              boolean;
    participants:            Participant[];
    sprints?:                Sprint[];
    teamMembers?:            User[];
}