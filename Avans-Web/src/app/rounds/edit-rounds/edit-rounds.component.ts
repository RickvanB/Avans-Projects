import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {roundTimeValidator} from '../../shared/round-time.directive';
import {SpeedmeetService} from '../../services/speedmeet.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-rounds',
  templateUrl: './edit-rounds.component.html',
  styleUrls: ['./edit-rounds.component.scss']
})
export class EditRoundsComponent implements OnInit {

  speedmeet: any;
  round: {
    id: number,
    timestart: string,
    timeend: string
  };

  editRound = this.fb.group({
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
    private route: ActivatedRoute,
    private speedmeetService: SpeedmeetService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getSpeedmeet();

    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.getRound(params.get('id'));
      }
    });
  }

  getSpeedmeet(): void {
    this.speedmeetService.getSpeedmeet().subscribe(data => {
      this.speedmeet = data;
    });
  }

  getRound(id: string) {
    this.speedmeetService.getRounds().subscribe(rounds => {
      this.round = rounds.find(r => r.id.toString(10) === id);

      this.editRound.patchValue(this.round);
    });
  }

  onSubmit() {
    if (this.editRound.invalid) {
      return;
    }

    this.speedmeetService.editRound(this.round.id, this.editRound.value.timestart, this.editRound.value.timeend).subscribe(round => {
      this.snackBar.open('Tijdslot is opgeslagen.', null, {
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
