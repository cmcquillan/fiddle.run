import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'fiddle-show-error-dialog',
  templateUrl: './show-error-dialog.component.html',
  styleUrls: ['./show-error-dialog.component.scss']
})
export class ShowErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public error: any) {
  }

  ngOnInit(): void {
  }

  stringify(error: any) {
    return JSON.stringify(error);
  }

  close() {
    
  }

}
