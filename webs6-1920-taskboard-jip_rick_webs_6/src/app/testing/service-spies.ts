// / <reference path="../../node_modules/@types/jasmine/ts3.1/index.d.ts"/>

import { Project } from '../models/project';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Sprint } from '../models/sprint';
import { User } from '../models/user';
import { UserStory } from '../models/userStory';

export function getRouterSpy(): {
    navigate: jasmine.Spy
} {
    return jasmine.createSpyObj('Router', ['navigate']);
}

export function getProjectServiceSpy(projects: Project[]) : {
    subScribeOnProjects: jasmine.Spy,
    addProject: jasmine.Spy,
    updateProject: jasmine.Spy,
    getProject: jasmine.Spy,
    getProjectsOfUser: jasmine.Spy,
    addParticipant: jasmine.Spy,
    updateParticipant: jasmine.Spy,
    removeParticipant: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('MainProjectService', [
        'subScribeOnProjects',
        'addProject',
        'updateProject',
        'getProject',
        'getProjectsOfUser',
        'addParticipant',
        'updateParticipant',
        'removeParticipant'
    ]);

    spy.getProject.and.returnValue(new BehaviorSubject<Project>(projects[0]));
    spy.getProjectsOfUser.and.returnValue(new BehaviorSubject<Project[]>(projects));
    spy.subScribeOnProjects.and.returnValue(new BehaviorSubject<Project[]>(projects));

    return spy;
}

export function getSprintServiceSpy(sprints: Sprint[]) : {
    subScribeOnSprints: jasmine.Spy,
    getSprint: jasmine.Spy,
    addSprint: jasmine.Spy,
    updateSprint: jasmine.Spy,
    deleteSprint: jasmine.Spy,
} {
    const spy = jasmine.createSpyObj('MainSprintService', [
        'subScribeOnSprints',
        'getSprint',
        'addSprint',
        'updateSprint',
        'deleteSprint'
    ]);

    spy.subScribeOnSprints.and.returnValue(new BehaviorSubject<Sprint[]>(sprints));
    spy.getSprint.and.returnValue(new BehaviorSubject<Sprint>(sprints[0]));;

    return spy;
}

export function getBurnDownServiceSpy(chartData: any[]) : {
    perpareData: jasmine.Spy,
    getChartData: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('BurnDownService', [
        'perpareData',
        'getChartData'
    ]);

    spy.getChartData.and.returnValue(new BehaviorSubject<any>(chartData));

    return spy;
}

export function getStoreServivceServiceSpy(object: any) : {
    setValue: jasmine.Spy,
    getValue: jasmine.Spy,
    removeValue:  jasmine.Spy
} {
    const spy = jasmine.createSpyObj('StoreService', [
        'setValue',
        'getValue',
        'removeValue'
    ]);

    spy.getValue.and.returnValue(new BehaviorSubject<any>(object));

    return spy;
}

export function getUserServivceServiceSpy(users: User[]) : {
    subScribeOnUsers: jasmine.Spy,
    getUser: jasmine.Spy,
    getUserByEmail:  jasmine.Spy,
    getTeam: jasmine.Spy,
    addUserAsParticipant: jasmine.Spy,
    updateParticipant: jasmine.Spy,
    removeUserAsParticipant: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('MainUserService', [
        'subScribeOnUsers',
        'getUser',
        'getUserByEmail',
        'getTeam',
        'addUserAsParticipant',
        'updateParticipant',
        'removeUserAsParticipant'
    ]);

    spy.subScribeOnUsers.and.returnValue(new BehaviorSubject<User[]>(users));
    spy.getUser.and.returnValue(new BehaviorSubject<User>(users[0]));
    spy.getUserByEmail.and.returnValue(new BehaviorSubject<User>(users[0]));
    spy.getTeam.and.returnValue(new BehaviorSubject<User[]>(users));

    return spy;
}

export function getUserStoryServivceServiceSpy(userstories: UserStory[]) : {
    subscribeOnUserStories: jasmine.Spy,
    getAvailableUserStories: jasmine.Spy,
    createNewUserStory:  jasmine.Spy,
    updateUserStory: jasmine.Spy,
    addToSprint: jasmine.Spy,
    removeFromSprint: jasmine.Spy,
    deleteUserStory: jasmine.Spy,
    getUserStory: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('MainUserstoryService', [
        'subscribeOnUserStories',
        'getAvailableUserStories',
        'createNewUserStory',
        'updateUserStory',
        'addToSprint',
        'removeFromSprint',
        'deleteUserStory',
        'getUserStory'
    ]);

    spy.subscribeOnUserStories.and.returnValue(new BehaviorSubject<UserStory[]>(userstories));
    spy.getAvailableUserStories.and.returnValue(new BehaviorSubject<UserStory[]>(userstories));
    spy.getUserStory.and.returnValue(new BehaviorSubject<UserStory>(userstories[1]));

    return spy;
}

export function getAuthServivceServiceSpy(user: User) : {
    googleSignin: jasmine.Spy,
    signOut: jasmine.Spy,
    getuser: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('AuthService', [
        'googleSignin',
        'signOut',
        'getuser'
    ]);

    spy.googleSignin.and.returnValue(new BehaviorSubject<User>(user));
    spy.getuser.and.returnValue(of(user));
    
    return spy;
}

// SUB

export function getSubProjectServivceServiceSpy(projects: Project[]) : {
    subscribeOnProjects: jasmine.Spy,
    getProject: jasmine.Spy,
    addProject: jasmine.Spy,
    updateProject: jasmine.Spy,
    deleteProject: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('ProjectService', [
        'subscribeOnProjects',
        'getProject',
        'addProject',
        'updateProject',
        'deleteProject'
    ]);

    spy.subscribeOnProjects.and.returnValue(new BehaviorSubject<Project[]>(projects));
    spy.getProject.and.returnValue(new BehaviorSubject<Project>(projects[0]));
    
    return spy;
}

export function getSubSprintServivceServiceSpy(sprints: Sprint[]) : {
    getAllSprints: jasmine.Spy,
    getSprint: jasmine.Spy,
    addSprint: jasmine.Spy,
    updateSprint: jasmine.Spy,
    deleteSprint: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('SprintService', [
        'getAllSprints',
        'getSprint',
        'addSprint',
        'updateSprint',
        'deleteSprint'
    ]);

    spy.getAllSprints.and.returnValue(new BehaviorSubject<Sprint[]>(sprints));
    spy.getSprint.and.returnValue(new BehaviorSubject<Sprint>(sprints[0]));
    
    return spy;
}

export function getSubUserStoryServivceServiceSpy(userstories: UserStory[]) : {
    getAllUserStories: jasmine.Spy,
    getUserStory: jasmine.Spy,
    addUserStory: jasmine.Spy,
    updateUserStory: jasmine.Spy,
    deleteUserStory: jasmine.Spy
} {
    const spy = jasmine.createSpyObj('UserStoryService', [
        'getAllUserStories',
        'getUserStory',
        'addUserStory',
        'updateUserStory',
        'deleteUserStory'
    ]);

    spy.getAllUserStories.and.returnValue(new BehaviorSubject<UserStory[]>(userstories));
    spy.getUserStory.and.returnValue(new BehaviorSubject<UserStory>(userstories[0]));
    
    return spy;
}

export function getSubUserServivceServiceSpy(users: User[]) : {
    subscribeOnUsers: jasmine.Spy,
    addUserAsParticipant: jasmine.Spy,
    updateParticipant: jasmine.Spy,
    removeUserAsParticipant: jasmine.Spy,
} {
    const spy = jasmine.createSpyObj('UserService', [
        'subscribeOnUsers',
        'addUserAsParticipant',
        'updateParticipant',
        'removeUserAsParticipant',
    ]);

    spy.subscribeOnUsers.and.returnValue(new BehaviorSubject<User[]>(users));
    
    return spy;
}

// FIREBASE

export function getFirstoreSpy(documents: any) : {
    collection: jasmine.Spy,
    doc: jasmine.Spy,
    valueChanges: jasmine.Spy,
} {
    const spy = jasmine.createSpyObj('AngularFirestore', [
        'collection',
        'doc',
        'valueChanges',
    ]);

    spy.collection.and.returnValue(new BehaviorSubject<any[]>(documents));
    spy.doc.and.returnValue(new BehaviorSubject<any[]>(documents[0]));
    spy.valueChanges.and.returnValue(new BehaviorSubject<any[]>(documents[0]));
    
    return spy;
}

