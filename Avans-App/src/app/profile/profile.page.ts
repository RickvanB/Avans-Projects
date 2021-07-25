import {Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Student } from '../models/student';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  student: Student;
  editAboutMe = false;

  file: File;
  filename: string;

  constructor(
  private toast: ToastController,
  private authService: AuthService,
  private router: Router,
  private studentService: StudentService
  ) { }

  ngOnInit() {
    this.student = this.authService.getStudent();

    // Get about me text
    this.studentService.getStudent(this.student.id).subscribe(student => {
      this.student.aboutMe = student.aboutMe;
    });
  }

  handleFileUpload(files: FileList) {
    this.file =  files[0];
    this.filename = files[0].name;
  }

  /**
   * This method will sign out the current student
   */
  signOut() {
    this.authService.removeAccessToken();
    this.router.navigate(['/login']);
  }

  /**
   * This method will activate the textarea for editing the about me page
   */
  activateEditAboutMe() {
    this.editAboutMe = true;
  }

  /**
   * This method will deactivate the textarea for editing the about me page
   */
  deActivateEditAboutMe() {
    this.editAboutMe = false;

    // Save new about me text
    this.studentService.patchStudent(this.student).subscribe();
  }

  /**
   * This method will upload a new CV for the current student
   */
  uploadCV() {
    this.toast.create({message: 'Je CV wordt geupload, een moment geduld a.u.b.', duration: 4000}).then((toast) => {
      toast.present();
    });

    // Upload new CV
    if (!this.file) {
      this.toast.create({message: 'Het Uploaden van je CV is mislukt', duration: 4000}).then((toast) => {
        toast.present();
      });
      return;
    }

    const formData = new FormData();
    formData.append('cv', this.file);

    this.studentService.patchStudentCV(this.student, formData).subscribe(() => {
      this.toast.create({message: 'Je CV is geupload', duration: 4000}).then((toast) => {
        toast.present();
      });
    });
  }

  /**
   * This method will remove the CV of the current student
   */
  removeCV() {
    // Remove CV
    const formData = new FormData();
    formData.append('cv', null);
    this.studentService.patchStudentCV(this.student, formData).subscribe(() => {
      this.toast.create({message: 'Je CV is verwijderd', duration: 4000}).then((toast) => {
        toast.present();
      });
    });
  }

  credits() {
    this.router.navigate(['/profile/credits']);
  }
}
