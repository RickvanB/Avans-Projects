import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { testdata } from 'src/app/testing/test-data';
import { of, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Project } from 'src/app/models/project';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { User } from 'src/app/models/user';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {

    let user = testdata().users[0];
    let authStoreMock = {
      authState : of(user),

      pipe(){
        return of(user);
      },

      signInWithPopup(provider): Promise<any>{
        return Promise.resolve();
      },

      signOut() : Promise<any>{
        return Promise.resolve();
      }
    }

    var project = testdata().projects[0];
    var angularFireStoreMock = {
      collection<T>(path, queryFn) {
        return {
          valueChanges(options): Observable<Project[]>{
            return of([project])
          },

          add(doc): Promise<Project> {
            return Promise.resolve(doc);
          }
        }
      },

      doc<T>(path){
        return {
          valueChanges(): Observable<Project>{
            return of(project)
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
        { provide: AngularFirestore, useValue: angularFireStoreMock },
        { provide: AngularFireAuth, useValue: authStoreMock }
      ],
      imports : [
        RouterTestingModule
      ]
    ,});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
