import { Component, OnInit, Input } from '@angular/core';
import { BurnDownService } from 'src/app/services/main_services/burn_down_service/burn-down.service';

@Component({
  selector: 'app-sprint-burndown',
  templateUrl: './sprint-burndown.component.html',
  styleUrls: ['./sprint-burndown.component.scss']
})
export class SprintBurndownComponent implements OnInit {

  @Input() projectId : string
  @Input() sprintId : string

  multi: any[];
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Dagen';
  yAxisLabel: string = 'Aantal Story Points';
  timeline: boolean = true;
  xScale = 0;

  colorScheme = {
    domain: ['#5AA454', '#E44D25']
  };

  constructor(private burndownSerive:  BurnDownService) {
      Object.assign(this, { data: this.multi });
  }

  
  ngOnInit(): void {
    this.burndownSerive.perpareData(this.projectId, this.sprintId);
    this.burndownSerive.getChartData().subscribe(multi => {
      if(multi){
        if(multi[0]){
          this.xScale = multi[0].series.length;
        }     
        this.multi = multi;
      }
    })
  }

  onSelect(data): void {
  }

  onActivate(data): void {
  }

  onDeactivate(data): void {
  }
}
