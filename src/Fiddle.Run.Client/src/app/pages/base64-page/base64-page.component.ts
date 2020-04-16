import { Component, OnInit, ViewChild } from '@angular/core';
import { TransformStoreService } from 'src/app/services/transform-store.service';
import { ITransform } from 'src/data/transforms';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/form-field';
import { Data } from 'src/data/format';
import { Formats } from 'src/data/format-types';

@Component({
  selector: 'fiddle-base64-page',
  templateUrl: './base64-page.component.html',
  styleUrls: ['./base64-page.component.scss']
})
export class Base64PageComponent implements OnInit {
  private readonly _inbox: ITransform;
  private readonly _transform: ITransform;
  private readonly _outbox: ITransform;

  @ViewChild('input') input: MatInput;

  @ViewChild('output') out: any;

  input$ = this.input;

  constructor(
    transforms: TransformStoreService) {
    this._transform = transforms.get('atob');
    this._inbox = transforms.get('textInput');
    this._outbox = transforms.get('textOutput');
  }

  get transform(): ITransform { return this._transform; }
  get inboxTransform(): ITransform { return this._inbox; }
  get outboxTransform(): ITransform { return this._outbox; }

  ngOnInit(): void {
  }

  coerceInput(data: string) {
    return new Data(data, Formats.Text);
  }
}
