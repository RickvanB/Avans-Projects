import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { testdata } from 'src/app/testing/test-data';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    var user = testdata().users[0];
    var angularFireStoreMock = {
      collection<T>(path, queryFn) {
        return {
          valueChanges(options): Observable<User[]>{
            return of([user])
          },

          add(doc): Promise<User> {
            return Promise.resolve(doc);
          }
        }
      },

      doc<T>(path){
        return {
          valueChanges(): Observable<User>{
            return of(user)
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
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
