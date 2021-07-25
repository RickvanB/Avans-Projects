import {Component, OnInit} from '@angular/core';
import {MajorService} from '../services/major.service';
import {Observable} from 'rxjs';
import {Major} from '../models/major';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserType} from '../models/student';

@Component({
  selector: 'app-major-select',
  templateUrl: './major-select.page.html',
  styleUrls: ['./major-select.page.scss'],
})
export class MajorSelectPage implements OnInit {

  majors: Observable<Major[]>;

  constructor(
      private majorService: MajorService,
      private authService: AuthService,
      private router: Router
  ) { }

  ngOnInit() {
    const student = this.authService.getStudent();

    if (student.type === UserType.ADMIN || student.type === UserType.SUPERADMIN) {
      this.majors = this.majorService.getMajors();
    } else if (typeof student.major !== 'string') {
      this.majors = this.majorService.getMajorsByEducation(student.major.educationCode);
    } else {
      this.majors = this.majorService.getMajorsByEducation(student.major);
    }
  }

  selectMajor(major: Major) {
    if (this.authService.getStudent().type === UserType.SUPERADMIN || this.authService.getStudent().type === UserType.ADMIN) {
      this.authService.refreshEmployeeToken(major.id).then(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.majorService.assignMajorToStudent(this.authService.getStudent(), major).subscribe(() => {
        this.authService.refreshStudentToken().then(() => {
          this.router.navigate(['/']);
        });
      });
    }
  }
}
