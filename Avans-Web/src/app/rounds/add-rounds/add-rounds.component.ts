import { Component, OnInit } from '@angular/core';
import { SpeedmeetService } from 'src/app/services/speedmeet.service';
import {Validators, FormBuilder} from '@angular/forms';
import {roundTimeValidator} from '../../shared/round-time.directive';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-rounds',
  templateUrl: './add-rounds.component.html',
  styleUrls: ['./add-rounds.component.scss']
})
export class AddRoundsComponent implements OnInit {

  speedmeet: any;

  addRound = this.fb.group({
    timestart: ['', [
      Validators.required,
      roundTimeValidator()
    ]],
    timeend: ['', [
      Validators.required,
      roundTimeValidator()
    ]]
  });

  constructor(
    private speedmeetService: SpeedmeetService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSpeedmeet();
  }

  getSpeedmeet(): void {
    this.speedmeetService.getSpeedmeet().subscribe(data => {
      this.speedmeet = data;
    });
  }

  onSubmit() {
    if (this.addRound.invalid) {
      return;
    }

    this.speedmeetService.addRound(this.addRound.value.timestart, this.addRound.value.timeend).subscribe(round => {
      this.snackBar.open('Tijdslot is toegevoegd.', null, {
        duration: 3000
      });

      this.router.navigate(['/rounds']);
    }, err => {
      this.snackBar.open('Er is een fout opgetreden tijdens het opslaan van het tijdslot. Probeer het later nog eens.', null, {
        duration: 5000
      });
    });
  }
}
