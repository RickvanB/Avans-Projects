import { TestBed } from '@angular/core/testing';

import { UserStoryService } from './user-story.service';
import { UserStory } from 'src/app/models/userStory';
import { testdata } from 'src/app/testing/test-data';
import { of, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

describe('UserStoryService', () => {
  let service: UserStoryService;

  beforeEach(() => {
    var userstory = testdata().userstories[0];
    var angularFireStoreMock = {
      collection<T>(path, queryFn) {
        return {
          valueChanges(options): Observable<UserStory[]>{
            return of([userstory])
          },

          add(doc): Promise<UserStory> {
            return Promise.resolve(doc);
          }
        }
      },

      doc<T>(path){
        return {
          valueChanges(): Observable<UserStory>{
            return of(userstory)
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
    service = TestBed.inject(UserStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
