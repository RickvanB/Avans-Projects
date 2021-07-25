import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { testdata } from 'src/app/testing/test-data';
import { Observable, of } from 'rxjs';
import { Project } from 'src/app/models/project';
import { AngularFirestore } from '@angular/fire/firestore';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
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
        { provide: AngularFirestore, useValue: angularFireStoreMock }
      ],
    });
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
