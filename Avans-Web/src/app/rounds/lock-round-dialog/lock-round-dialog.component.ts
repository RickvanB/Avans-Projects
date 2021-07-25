import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Location} from '@angular/common';


@Component({
  selector: 'app-lock-round-dialog',
  templateUrl: './lock-round-dialog.component.html',
  styleUrls: ['./lock-round-dialog.component.scss']
})
export class LockRoundDialogComponent implements OnInit {

  companyId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {round: any},
    private dialogRef: MatDialogRef<LockRoundDialogComponent>,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
    this.location.back();
  }

}
