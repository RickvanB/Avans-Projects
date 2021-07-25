import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { StoreKeys } from 'src/app/enums/store_keys';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save item in store', () => {
    service.setValue(StoreKeys.Project_Edit, "edit");
    expect(service.getValue(StoreKeys.Project_Edit)).toEqual("edit");
  });

  it('should remove item in store', () => {
    service.removeValue(StoreKeys.Project_Edit);
    expect(service.getValue(StoreKeys.Project_Edit)).toBeUndefined();
  });
});
