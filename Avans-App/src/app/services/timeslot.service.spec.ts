import { TestBed } from '@angular/core/testing';

import { TimeslotService } from './timeslot.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SocketService} from './socket.service';
import {testData} from '../../testing/test-data';
import {environment} from '../../environments/environment';

let socketSpy: { on: jasmine.Spy, emit: jasmine.Spy };
let socketServiceSpy: { getSocket: jasmine.Spy };
let service: TimeslotService;
let httpTestingController: HttpTestingController;
const expectedTimeslots = testData().timeslots;

describe('TimeslotService', () => {
  beforeEach(() => {
    socketSpy = jasmine.createSpyObj('Socket', ['on', 'emit']);
    socketServiceSpy = jasmine.createSpyObj('SocketService', ['getSocket']);
    socketServiceSpy.getSocket.and.returnValue(socketSpy);

    TestBed.configureTestingModule({
      providers: [
        { provide: SocketService, useValue: socketServiceSpy },
        TimeslotService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(TimeslotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected timeslots of company', () => {
    service.getTimeslotsOfCompany(1).subscribe(timeslots => {
      expect(timeslots).toEqual(expectedTimeslots);
    }, error => fail('should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/companies/1/timeslots`);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedTimeslots);
  });

  it('should return expected timeslots of student', () => {
    service.getTimeslotsOfStudent(1).subscribe(timeslots => {
      expect(timeslots).toEqual(expectedTimeslots);
    }, error => fail('should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/students/1/timeslots`);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedTimeslots);
  });

  it('should return expected timeslot (single)', () => {
    service.getTimeslot(1).subscribe(timeslot => {
      expect(timeslot).toEqual(expectedTimeslots[0]);
    }, error => fail('should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/timeslots/1`);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedTimeslots[0]);
  });

  it('should return error when timeslot not found', () => {
    const errorMessage = 'Timeslot not found';

    service.getTimeslot(1).subscribe(
  timeslot => fail('should return error'),
  error => {
          expect(error.status).toEqual(404);
          expect(error.error).toEqual(errorMessage);
    });

    const req = httpTestingController.expectOne(`${environment.api_base}/timeslots/1`);

    expect(req.request.method).toEqual('GET');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should claim timeslot', done => {
    service.claimTimeslot(1).subscribe(() => {
      done();
    }, error => fail('should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/timeslots/1`);

    expect(req.request.method).toEqual('PATCH');

    req.flush(null);
  });

  it('should return error when timeslot to claim not found', () => {
    const errorMessage = 'Timeslot not found';

    service.claimTimeslot(1).subscribe(
        timeslot => fail('should return error'),
        error => {
          expect(error.status).toEqual(404);
          expect(error.error).toEqual(errorMessage);
        });

    const req = httpTestingController.expectOne(`${environment.api_base}/timeslots/1`);

    expect(req.request.method).toEqual('PATCH');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should observe company timeslots via websocket', () => {
    service.subscribeToCompanyRoom(1);
    service.observeTimeslotsByCompany().subscribe();

    expect(socketSpy.emit.calls.count()).toEqual(1);
    expect(socketSpy.emit.calls.first().args[0]).toEqual('subscribe');
    expect(socketSpy.emit.calls.first().args[1]).toEqual({room: 'companies/1'});

    expect(socketSpy.on.calls.count()).toEqual(1);
    expect(socketSpy.on.calls.first().args[0]).toEqual('timeslot_change');
    expect(socketSpy.on.calls.first().args[1]).toBeDefined();
  });
});
