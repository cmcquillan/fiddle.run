import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { TransformContext, ErrorContext, Transform } from 'src/data/transforms';
import { IFormattedData } from 'src/data/format';
import { NullFormatted, Formats } from 'src/data/format-types';
import { TransformFactory } from 'src/data/transform-types';

@Component({
  selector: 'fiddle-transform-box',
  templateUrl: './transform-box.component.html',
  styleUrls: ['./transform-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransformBoxComponent implements OnInit, OnDestroy {
  private readonly _transform = new BehaviorSubject<Transform>(TransformFactory.createNoop());
  private readonly _in = new BehaviorSubject<IFormattedData>(NullFormatted);
  private readonly _parameterChanged = new BehaviorSubject<boolean>(true);
  private _sub: Subscription = null;

  transform$ = this._transform.asObservable();
  in$ = this._in.asObservable();
  parameterChanged$ = this._parameterChanged.asObservable();

  @Input() set transform(value: Transform) { this._transform.next(value); }
  get transform(): Transform { return this._transform.value; }

  @Input() set in(value: IFormattedData) { this._in.next(value); this.parameterChanged(); }
  get in(): IFormattedData { return this._in.value; }

  @Output() out = new EventEmitter<IFormattedData>();

  constructor() {
  }

  ngOnInit(): void {

  }

  parameterChanged(): void {
    this._parameterChanged.next(true);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  test(val: any) {
    console.log(val);
    return val;
  }
}
