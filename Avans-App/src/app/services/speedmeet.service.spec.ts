import { TestBed } from '@angular/core/testing';

import { SpeedmeetService } from './speedmeet.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {testData} from '../../testing/test-data';
import {environment} from '../../environments/environment';
import {SocketService} from './socket.service';

let socketSpy: { on: jasmine.Spy, emit: jasmine.Spy };
let socketServiceSpy: { getSocket: jasmine.Spy };
let httpTestingController: HttpTestingController;
let service: SpeedmeetService;
const expectedSpeedmeet = testData().speedmeet;

describe('SpeedmeetService', () => {
  beforeEach(() => {
    socketSpy = jasmine.createSpyObj('Socket', ['on', 'emit']);
    socketServiceSpy = jasmine.createSpyObj('SocketService', ['getSocket']);
    socketServiceSpy.getSocket.and.returnValue(socketSpy);

    TestBed.configureTestingModule({
      providers: [
        { provide: SocketService, useValue: socketServiceSpy },
        SpeedmeetService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(SpeedmeetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return speedmeet', () => {
    service.getLatestSpeedmeet().subscribe(speedmeet => {
      expect(speedmeet).toEqual(expectedSpeedmeet);
    }, error => fail('should not return error'));

    const req = httpTestingController.expectOne(`${environment.api_base}/speedmeet`);

    expect(req.request.method).toEqual('GET');

    req.flush(expectedSpeedmeet);
  });

  it('should return error when speedmeet not found', () => {
    const errorMessage = 'Speedmeet not found';

    service.getLatestSpeedmeet().subscribe(
speedmeet => fail('should return error'),
error => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(errorMessage);
    });

    const req = httpTestingController.expectOne(`${environment.api_base}/speedmeet`);

    expect(req.request.method).toEqual('GET');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('should observe speedmeet via websocket', () => {
    service.observeSpeedmeet().subscribe();

    expect(socketSpy.on.calls.count()).toEqual(1);
    expect(socketSpy.on.calls.first().args[0]).toEqual('speedmeet_change');
    expect(socketSpy.on.calls.first().args[1]).toBeDefined();
  });
});
