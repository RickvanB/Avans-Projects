import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
        HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: SocketService = TestBed.get(SocketService);
    expect(service).toBeTruthy();
  });
});
