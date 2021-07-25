import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AttemptService } from '../services/attempt.service';
import { Location } from 'src/models/Location';
import { Target } from 'src/models/Target';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.css']
})
export class AttemptComponent implements OnInit {

  attemptForm = new FormGroup({
    attemptName: new FormControl(''),
    attemptLat: new FormControl(''),
    attemptLong:new FormControl(''),
    attemptImage: new FormControl(''),
  });

  private id : String

  constructor(private attemptService: AttemptService, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit() {
  }

  onSubmit() : void {
    var targetLocation = new Location();
    targetLocation.type = "Point";
    targetLocation.coordinates = [this.attemptForm.value.attemptLat, this.attemptForm.value.attemptLong];

    var target = new Target();
    target.name = this.attemptForm.value.targetName;
    target.location = targetLocation;

    var file = this.attemptForm.get('attemptImage').value;

    let id = this.route.snapshot.paramMap.get('id');
    this.attemptService.newAttempt(target, file, this.id).subscribe(data => {
      console.log(data);
      alert("Attempt is toegevoegd!");
    }, error => {
      alert("Er is iets misgegaan, probeer het later opnieuw!");
      console.log(error);
    })
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.attemptForm.get('attemptImage').setValue(file);
    }
  }

}
