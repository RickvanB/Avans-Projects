import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpeedmeetService } from 'src/app/services/speedmeet.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LockRoundDialogComponent } from '../lock-round-dialog/lock-round-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CompaniesService } from 'src/app/services/companies.service';
import { TimeslotsService } from 'src/app/services/timeslots.service';

@Component({
  selector: 'app-lock-round',
  templateUrl: './lock-round.component.html',
  styleUrls: ['./lock-round.component.scss']
})
export class LockRoundComponent implements OnInit {

  round: {
    id: number,
    timestart: string,
    timeend: string
  };

  private companyId: any;

  constructor(
    private dialog: MatDialog,
    private speedmeetService: SpeedmeetService,
    private timeslotsService: TimeslotsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('id') && params.get('companyId')) {
        this.speedmeetService.getRounds().subscribe(rounds => {
          this.round = rounds.find(r => r.id.toString(10) === params.get('id'));
          this.companyId = params.get('companyId');

          this.dialog.open(LockRoundDialogComponent, {
            data: {
              round: this.round
            }
          }).afterClosed().subscribe(data => {
            if (!data.enabled) {
              this.timeslotsService.lockTimeslot(this.round.id, data.enabled, false).subscribe(() => {
                this.snackBar.open('Tijdslot is op slot gezet.', null, {
                  duration: 2000
                });

                this.router.navigate(['/companies/' + this.companyId + '/rounds']);
              }, error => {
                if (error instanceof HttpErrorResponse) {
                  if (error.status === 409) {
                    this.snackBar.open('Dit tijdslot kan niet op slot gezet worden omdat er al een student is ingeschreven', null, {
                      duration: 5000
                    });

                    this.router.navigate(['/companies/' + this.companyId + '/rounds']);
                  }
                }
              });
            } else {
              this.router.navigate(['/companies/' + this.companyId + '/rounds']);
            }
          });
        });
      }
    });
  }

}
