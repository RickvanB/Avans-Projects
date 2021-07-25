import { TestBed } from '@angular/core/testing';

import { SprintService } from './sprint.service';
import { testdata } from 'src/app/testing/test-data';
import { of, Observable } from 'rxjs';
import { Sprint } from 'src/app/models/sprint';
import { AngularFirestore } from '@angular/fire/firestore';

describe('SprintService', () => {
  let service: SprintService;

  beforeEach(() => {
    
    var sprint = testdata().sprints[0];
    var angularFireStoreMock = {
      collection<T>(path, queryFn) {
        return {
          valueChanges(options): Observable<Sprint[]>{
            return of([sprint])
          },

          add(doc): Promise<Sprint> {
            return Promise.resolve(doc);
          }
        }
      },

      doc<T>(path){
        return {
          valueChanges(): Observable<Sprint>{
            return of(sprint)
          },

          set(doc): Promise<void>{
            return Promise.resolve();
          },

          delete(): Promise<void>{
            return Promise.resolve();
          }
        }
      }
    }

    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFireStoreMock }
      ]
    });
    service = TestBed.inject(SprintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
