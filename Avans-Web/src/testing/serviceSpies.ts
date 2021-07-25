import {Observable} from 'rxjs';

export function getSpeedmeetServiceSpy(): {
  getSpeedmeet: jasmine.Spy,
  getRounds: jasmine.Spy,
  addRound: jasmine.Spy,
  editRound: jasmine.Spy,
  deleteRound: jasmine.Spy
} {
  const spy = jasmine.createSpyObj('SpeedmeetService', [
    'getSpeedmeet',
    'getRounds',
    'addRound',
    'editRound',
    'deleteRound',
    'getEducations'
  ]);

  spy.getSpeedmeet.and.returnValue(new Observable());
  spy.getRounds.and.returnValue(new Observable());
  spy.addRound.and.returnValue(new Observable());
  spy.editRound.and.returnValue(new Observable());
  spy.deleteRound.and.returnValue(new Observable());
  spy.getEducations.and.returnValue(new Observable());

  return spy;
}

export function getCompanyServiceSpy(): {
  getTimeSlotsByCompany: jasmine.Spy,
  getTimeSlots: jasmine.Spy,
  getAllCompanies: jasmine.Spy,
  getCompanyMajorById: jasmine.Spy,
  getCompanyById: jasmine.Spy,
  getCompanyContactById: jasmine.Spy

} {
  const spy = jasmine.createSpyObj('CompanyService', [
    'getTimeSlots',
    'getTimeSlotsByCompany',
    'getAllCompanies',
    'getCompanyMajorById',
    'getCompanyById',
    'getCompanyContactById'
  ]);

  spy.getTimeSlots.and.returnValue(new Observable());
  spy.getTimeSlotsByCompany.and.returnValue(new Observable());
  spy.getAllCompanies.and.returnValue(new Observable());
  spy.getCompanyMajorById.and.returnValue(new Observable());
  spy.getCompanyById.and.returnValue(new Observable());
  spy.getCompanyContactById.and.returnValue(new Observable());

  return spy;
}

export function getEducationServiceSpy(): {
  getEducations: jasmine.Spy,
  addEducation: jasmine.Spy,
  deleteEducation: jasmine.Spy,
  updateEducation: jasmine.Spy
} {
  const spy = jasmine.createSpyObj('EducationsService', [
    'getEducations',
    'addEducation',
    'deleteEducation',
    'updateEducation'
  ]);

  spy.getEducations.and.returnValue(new Observable());
  spy.addEducation.and.returnValue(new Observable());
  spy.deleteEducation.and.returnValue(new Observable());
  spy.updateEducation.and.returnValue(new Observable());

  return spy;
}

export function getCompanyLoginServiceSpy(): {
  login: jasmine.Spy
} {
  const spy = jasmine.createSpyObj('LoginCompanyService', [
    'login'
  ]);

  spy.login.and.returnValue(new Observable());

  return spy;
}

export function getAuthServiceSpy(): {
  getAccessToken: jasmine.Spy,
  setAccessToken: jasmine.Spy,
  removeAccessToken: jasmine.Spy
} {
  const spy = jasmine.createSpyObj('AuthService', [
    'getAccessToken',
    'setAccessToken',
    'removeAccessToken'
  ]);

  // tslint:disable-next-line
  spy.getAccessToken.and.returnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoxLCJpZCI6MSwibmFtZSI6IlhhbmRvciIsImxhc3RuYW1lIjoiSmFuc3NlbiIsIm1ham9yIjpudWxsLCJjb21wYW55SWQiOjEsImlhdCI6MTU4Njk3MDg2Mn0.FCK72-kKmLqSVGkJqzrFEVjELvYZNduydpnep3mtLmE');

  return spy;
}

export function getTimeslotServiceSpy(): {
  lockTimeslot: jasmine.Spy
} {
  const spy = jasmine.createSpyObj('TimeslotsService', [
    'lockTimeslot'
  ]);

  spy.lockTimeslot.and.returnValue(new Observable());

  return spy;
}
