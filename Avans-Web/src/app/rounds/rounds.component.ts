import { Component, OnInit } from '@angular/core';
import { SpeedmeetService } from '../services/speedmeet.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rounds',
  templateUrl: './rounds.component.html',
  styleUrls: ['./rounds.component.scss']
})
export class RoundsComponent implements OnInit {

  round: {
    id: number,
    timestart: string,
    timeend: string
  };

  displayedColumns: string[] = ['round', 'actions'];
  speedmeet: any;
  rounds: any;

  constructor(private speedmeetService: SpeedmeetService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSpeedmeet();
    this.getRounds();
  }

  getSpeedmeet(): void {
    this.speedmeetService.getSpeedmeet().subscribe(data => {
      this.speedmeet = data;
    });
  }

  getRounds(): void {
    this.speedmeetService.getRounds().subscribe(data => {
      this.rounds = new MatTableDataSource(data);
    });
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.rounds.filter = filterValue;
  }

  deleteRound(id: number) {
    this.speedmeetService.getRounds().subscribe(rounds => {
      this.round = rounds.find(r => r.id.toString(10) === id);

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: {
          title: 'Weet je het zeker?',
          message: 'Weet je zeker dat je onderstaand tijdslot wilt verwijderen?',
          extra: this.round.timestart + ' - ' + this.round.timeend
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.speedmeetService.deleteRound(this.round.id).subscribe(() => {
            this.snackBar.open('Tijdslot is verwijderd.', null, {
              duration: 2000
            });

            this.ngOnInit();
          }, error => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 403) {
                this.snackBar.open('Dit tijdslot kan niet verwijderd worden, omdat er een student op ingeschreven is.', null, {
                  duration: 5000
                });

                this.ngOnInit();
              }
            }
          });
        } else {
          this.ngOnInit();
        }
      });
    });
  }
}
