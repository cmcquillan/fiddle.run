import { Component, OnInit } from '@angular/core';
import { TransformStoreService } from 'src/app/services/transform-store.service';
import { Transform } from 'src/data/transforms';

@Component({
  selector: 'fiddle-format-json-page',
  templateUrl: './format-json-page.component.html',
  styleUrls: ['./format-json-page.component.scss']
})
export class FormatJsonPageComponent implements OnInit {

  input: Transform;
  output: Transform;
  parseJSON: Transform;
  formatJSON: Transform;

  constructor(transform: TransformStoreService) {
    this.input = transform.get('textInput');
    this.output = transform.get('textOutput');
    this.parseJSON = transform.get('parseJSON');
    this.formatJSON = transform.get('formatJSON');
  }

  ngOnInit(): void {
  }

}
