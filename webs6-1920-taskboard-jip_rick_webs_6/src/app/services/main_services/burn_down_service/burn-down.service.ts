import { Injectable } from '@angular/core';
import { MainProjectService } from '../project_service/main-project.service';
import { BehaviorSubject } from 'rxjs';
import { Series } from '@swimlane/ngx-charts';
import { MainSprintService } from '../sprint_service/main-sprint.service';
import { MainUserstoryService } from '../userstory_service/main-userstory.service';

@Injectable({
  providedIn: 'root'
})
export class BurnDownService {

  chartData: BehaviorSubject<any[]>;

  constructor(private projectService: MainProjectService, private storyService: MainUserstoryService) {
    this.chartData = new BehaviorSubject([]);
  }

  getChartData(){
    return this.chartData;
  }

  async perpareData(projectId: string, sprintId: string) {
    let data = [];

    // Get project
    await this.projectService.getProject(projectId).subscribe(project =>{
      this.storyService.getAvailableUserStories(sprintId, projectId).subscribe(stories =>{
        if(project.sprints){
          // Find sprint
          project.sprints.forEach(sprint => {
            if(sprint.id == sprintId){
              // Collect date in between start and end
              let daylist: any[];
              if(sprint.startDate && sprint.endDate){
                daylist = this.getDaysArray(new Date(sprint.startDate),new Date(sprint.endDate));  
                daylist.map((v)=>v.toISOString().slice(0,10)).join("");
              }

              let usPerDay = 0;
              let totUs = 0;
              let perDay = [];
              if(stories && daylist){
                stories.forEach(userstory =>{
                  totUs += Number(userstory.storyPoints);
                })
                // Devide
                usPerDay = totUs / daylist.length;

                daylist.forEach(day => { 
                  var usLeft = totUs;    
                  stories.forEach(userstory =>{
                    if(userstory.movedToDone){
                      let dateOfDone: Date = new Date(this.toDateTime(userstory.movedToDone));
                      let dateInChart: Date = new Date(day);
                      dateOfDone.setHours(0,0,0,0);
                      dateInChart.setHours(0,0,0,0);
                      if(dateOfDone.getTime() <= dateInChart.getTime()){
                        usLeft = usLeft - userstory.storyPoints      
                      }
                    }
                  })
                  perDay.push(usLeft);
                });
              }

              if(daylist){
                const chartData: Series[] = [
                  {
                    name: "Gewenst",
                    series: []
                  },
                  {
                    name: "Werkelijk",
                    series: []
                  }
                ];
  
                chartData.forEach(line => {
                  let count = 1;
                  daylist.forEach(day => {
                    if(line.name == "Gewenst"){
                      line.series.push({
                        name: count,
                        value: totUs - (usPerDay * count)
                      });
                    } else{
                      line.series.push({
                        name: count,
                        value: perDay[count - 1]
                      });
                    }
                    count++;
                  });
                  this.chartData.next(chartData);
                })
              }
            }
          })
        }
      });
    })
  }

  /**
   * Get all date in between range
   * @param start 
   * @param end 
   */
  private getDaysArray(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
  };

  private toDateTime(secs) {
    var epoch = new Date(0);
    epoch.setSeconds(parseInt(secs.seconds));
    var date = epoch.toISOString();
    date = date.replace('T', ' ');
    return date.split('.')[0].split(' ')[0] + ' ' + epoch.toLocaleTimeString().split(' ')[0];
  }
}
