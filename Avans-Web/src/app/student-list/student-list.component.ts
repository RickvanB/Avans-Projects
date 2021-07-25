import { Component, OnInit } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies.service';
import { SpeedmeetService } from 'src/app/services/speedmeet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  displayedColumns: string[] = ['Naam', 'Tijdslot'];
  public students;
  public speedmeet;

  constructor(private companyService: CompaniesService,
              private speedmeetService: SpeedmeetService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.getTimeSlots(parseInt(params.get('id'), 10));

    });
    this.getSpeedmeet();
  }

  getTimeSlots(id: number): void {
    this.companyService.getTimeSlotsByCompany(id, false).subscribe(data => {
      this.students = data;
    });
  }

  getSpeedmeet(): void {
    this.speedmeetService.getSpeedmeet().subscribe(data => {
      this.speedmeet = data;
    });
  }

}
