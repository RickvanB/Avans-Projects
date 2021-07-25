import { Component, OnInit } from '@angular/core';
import { SpeedmeetService } from '../../services/speedmeet.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from '../../services/companies.service';
import { TimeslotsService } from '../../services/timeslots.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-company-rounds',
  templateUrl: './company-rounds.component.html',
  styleUrls: ['./company-rounds.component.scss']
})
export class CompanyRoundsComponent implements OnInit {

  displayedColumns: string[] = ['round', 'actions'];
  speedmeet: any;
  rounds: any;
  companyId: any;

  constructor(private speedmeetService: SpeedmeetService,
              private route: ActivatedRoute,
              private companiesService: CompaniesService,
              private timeslotsService: TimeslotsService,
              private snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getSpeedmeetss();
    this.route.paramMap.subscribe(params => {
      if (params.get('companyId')) {
        this.companyId = params.get('companyId');
        this.getRounds();
      }
    });
  }

  getSpeedmeetss(): void {
    this.speedmeetService.getSpeedmeet().subscribe(data => {
      this.speedmeet = data;
    });
  }

  getRounds(): void {
    this.companiesService.getTimeSlotsByCompany(this.companyId, true).subscribe(data => {
      this.rounds = new MatTableDataSource(data);
    });
  }

  unlockTimeslot(timeslotId: number): void {
    this.timeslotsService.lockTimeslot(timeslotId, true, false).subscribe(() => {
      this.snackBar.open('Tijdslot staat niet meer op slot', null, {
        duration: 2000
      });

      this.ngOnInit();

    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 409) {
          this.snackBar.open('Dit tijdslot kan niet op slot gezet worden omdat er al een student is ingeschreven', null, {
            duration: 5000
          });
        }
      }
    });
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.rounds.filter = filterValue;
  }

}
