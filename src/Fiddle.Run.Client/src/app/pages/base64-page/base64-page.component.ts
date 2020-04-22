import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TransformStoreService } from 'src/app/services/transform-store.service';
import { MatInput } from '@angular/material/input';
import { Data } from 'src/data/format';
import { Formats } from 'src/data/format-types';
import { Pipeline } from 'src/data/pipeline';

@Component({
  selector: 'fiddle-base64-page',
  templateUrl: './base64-page.component.html',
  styleUrls: ['./base64-page.component.scss']
})
export class Base64PageComponent implements OnInit, OnDestroy {
  private _pipeline: Pipeline;

  @ViewChild('input') input: MatInput;

  @ViewChild('output') out: any;

  input$ = this.input;

  constructor(
    transforms: TransformStoreService) {
    this._pipeline = new Pipeline([
      transforms.get('textInput'),
      transforms.get('atob'),
      transforms.get('textOutput'),
    ]);
    console.log('Pipeline: ', this._pipeline);
  }

  get transform() { return this._pipeline.transforms[1]; }
  get inboxTransform() { return this._pipeline.transforms[0]; }
  get outboxTransform() { return this._pipeline.transforms[2]; }


  ngOnInit(): void {
  }

  coerceInput(data: string) {
    return new Data(data, Formats.Text);
  }

  ngOnDestroy() {
    this._pipeline.disconnect();
  }
}
