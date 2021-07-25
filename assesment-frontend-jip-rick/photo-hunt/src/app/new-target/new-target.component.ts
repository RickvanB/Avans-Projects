import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TargetService } from '../services/target.service';
import { Target } from 'src/models/Target';
import { Location } from 'src/models/Location';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-new-target',
  templateUrl: './new-target.component.html',
  styleUrls: ['./new-target.component.css']
})
export class NewTargetComponent implements OnInit {

  targetForm = new FormGroup({
    targetName: new FormControl(''),
    targetLat: new FormControl(''),
    targetLong:new FormControl(''),
    targetImage: new FormControl(''),
  });
  


  constructor(private targetService: TargetService, private socket: WebsocketService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    var targetLocation = new Location();
    targetLocation.type = "Point";
    targetLocation.coordinates = [this.targetForm.value.targetLat, this.targetForm.value.targetLong];

    var target = new Target();
    target.name = this.targetForm.value.targetName;
    target.location = targetLocation;

    var file = this.targetForm.get('targetImage').value;

    this.targetService.newTarget(target, file).subscribe(data => {
      alert("Target is toegevoegd!");
    }, error => {
      console.log(error);
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.targetForm.get('targetImage').setValue(file);
    }
  }
}