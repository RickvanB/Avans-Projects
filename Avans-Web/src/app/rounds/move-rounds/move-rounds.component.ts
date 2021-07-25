import { Component, OnInit } from '@angular/core';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-move-rounds',
  templateUrl: './move-rounds.component.html',
  styleUrls: ['./move-rounds.component.scss']
})
export class MoveRoundsComponent implements OnInit {

  speedmeet: any;
  rounds: [any];
  moving = false;
  done = 0;

  moveRounds = this.fb.group({
    minutes: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private speedmeetService: SpeedmeetService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.speedmeetService.getSpeedmeet().subscribe(speedmeet => this.speedmeet = speedmeet);
    this.speedmeetService.getRounds().subscribe(rounds => this.rounds = rounds);
  }

  onSubmit() {
    if (!this.moveRounds.valid) {
      return;
    }

    this.moving = true;

    let minutesToAdd = parseInt(this.moveRounds.value.minutes, 10);

    if (isNaN(minutesToAdd)) {
      minutesToAdd = 0;
    }

    const observables = [];

    for (const round of this.rounds) {
      const newStartTime = new Date(new Date('1970/01/01 ' + round.timestart).getTime() + minutesToAdd * 60000)
        .toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', hour12: false });

      const newEndTime = new Date(new Date('1970/01/01 ' + round.timeend).getTime() + minutesToAdd * 60000)
        .toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit', hour12: false });

      observables.push(this.speedmeetService.editRound(round.id, newStartTime, newEndTime));
    }

    combineLatest(observables).subscribe(() => {
      this.snackBar.open('Alle tijdsloten zijn verschoven met ' + minutesToAdd + ' minuten.', null, {
        duration: 5000
      });

      this.router.navigate(['/rounds']);
    }, err => {
      this.snackBar.open('Er is een fout opgetreden tijdens het verschuiven van de tijdsloten. Probeer het later opnieuw.', null, {
        duration: 5000
      });

      this.router.navigate(['/rounds']);
    });
  }
}
