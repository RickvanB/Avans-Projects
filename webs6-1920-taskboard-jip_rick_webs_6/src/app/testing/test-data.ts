import { Project } from '../models/project';
import { Sprint } from '../models/sprint';
import { UserStory } from '../models/userStory';
import { User } from '../models/user';
import { Status } from '../enums/status';
import { UserStoryStatus } from '../enums/userStoryStatus';

export function testdata(){
    const projects: Project[] = 
    [
        {
            id: "123",
            description: "Test project omschrijving",
            isArchived: false,
            name: "Test project",
            owner: null,
            ownerId: "887",
            participants: [],
            status: Status.Inisiation_Phase,
            sprints: [],
            teamMembers: []
        },
        {
            id: "124",
            description: "Test project nummer 2 omschrijving",
            isArchived: true,
            name: "Ander testproject",
            owner: null,
            ownerId: "887",
            participants: [],
            status: Status.In_Development,
            sprints: [],
            teamMembers: []
        }
    ];

    const sprints: Sprint[] = 
    [
        {
            id: "225",
            description: "Sprint beschrijving",
            endDate: new Date("2020-05-27"),
            startDate: new Date("2020-05-25"),
            isActive: true,
            name: "sprint 1",
            project: null,
            projectId: "124",
            userstories: []
        },
        {
            id: "226",
            description: "Sprint beschrijving",
            endDate: new Date("2020-05-29"),
            startDate: new Date("2020-05-31"),
            isActive: false,
            name: "sprint 2",
            project: null,
            projectId: "124",
            userstories: []
        }
    ];

    const userstories: UserStory[] = 
    [
        {
           id: "558",
           description: "Als gebruiker wil ik dat deze testen slagen",
           isArchived: false,
           name: "Als gebruiker wil ik dat deze testen slagen",
           owner: null,
           ownerId: "887",
           sprint: null,
           sprintId: "226",
           status: UserStoryStatus.DONE,
           storyPoints: 5,
           taskOf: null,
           taskOfId: "887",
           movedToDone: new Date("20-05-2020")
        },
        {
            id: "559",
            description: "Als gebruiker wil ik dit scherm kunnen gebruiken",
            isArchived: false,
            name: "Als gebruiker wil ik dit scherm kunnen gebruiken",
            owner: null,
            ownerId: "887",
            sprint: null,
            sprintId: "226",
            status: UserStoryStatus.IN_DEVELOPMENT,
            storyPoints: 8,
            taskOf: null,
            taskOfId: "887",
            movedToDone: null
         }
    ];

    const users: User[] = 
    [
        {
            id: "887",
            email: "test@testdevelopment.nl",
            fullName: "Rick van den Heuvel",
            projects: [
                {
                    id: "123",
                    description: "Test project omschrijving",
                    isArchived: false,
                    name: "Test project",
                    owner: null,
                    ownerId: "887",
                    participants: [],
                    status: Status.Inisiation_Phase,
                    sprints: [],
                    teamMembers: []
                },
                {
                    id: "124",
                    description: "Test project nummer 2 omschrijving",
                    isArchived: true,
                    name: "Ander testproject",
                    owner: null,
                    ownerId: "887",
                    participants: [],
                    status: Status.In_Development,
                    sprints: [],
                    teamMembers: []
                } 
            ],
            role: "Lid",
            photoURL: null
        },
        {
            id: "888",
            email: "test2@testdevelopment.nl",
            fullName: "Jip van Bakel",
            projects: [
                {
                    id: "123",
                    description: "Test project omschrijving",
                    isArchived: false,
                    name: "Test project",
                    owner: null,
                    ownerId: "887",
                    participants: [],
                    status: Status.Inisiation_Phase,
                    sprints: [],
                    teamMembers: []
                },
                {
                    id: "124",
                    description: "Test project nummer 2 omschrijving",
                    isArchived: true,
                    name: "Ander testproject",
                    owner: null,
                    ownerId: "887",
                    participants: [],
                    status: Status.In_Development,
                    sprints: [],
                    teamMembers: []
                } 
            ],
            role: "Scrum Master",
            photoURL: null
        }
    ];

    const charts: any[] = [
        {
            "name": "Gewenst",
            "series": [
                {
                    "name": "dag 1",
                    "value": 10
                },
                {
                    "name": "dag 2",
                    "value": 7.5
                },
                {
                    "name": "dag 3",
                    "value": 5
                },
                {
                    "name": "dag 4",
                    "value": 2.5
                },
                {
                    "name": "dag 5",
                    "value": 0
                }
            ]
        },
        {
            "name": "Werkelijk",
            "series": [
                {
                    "name": "dag 1",
                    "value": 10
                },
                {
                    "name": "dag 2",
                    "value": 10
                },
                {
                    "name": "dag 3",
                    "value": 5
                },
                {
                    "name": "dag 4",
                    "value": 5
                },
                {
                    "name": "dag 5",
                    "value": 0
                }
            ]
        }
    ];

    const storeObject: any = {
        "object": "value"
    }

    return {
        storeObject,
        projects,
        users,
        charts,
        sprints,
        userstories
    }
}