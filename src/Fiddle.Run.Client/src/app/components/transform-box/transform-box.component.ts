import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { TransformContext, ErrorContext, Transform } from 'src/data/transforms';
import { IFormattedData } from 'src/data/format';
import { NullFormatted, Formats } from 'src/data/format-types';
import { TransformFactory } from 'src/data/transform-types';
import { MatDialog } from '@angular/material/dialog';
import { ShowErrorDialogComponent } from '../show-error-dialog/show-error-dialog.component';

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
  private _sub: Subscription = new Subscription();

  transform$ = this._transform.asObservable();
  in$ = this._in.asObservable();
  parameterChanged$ = this._parameterChanged.asObservable();

  @Input() set transform(value: Transform) { this._transform.next(value); }
  get transform(): Transform { return this._transform.value; }

  @Input() set in(value: IFormattedData) { this._in.next(value); this.parameterChanged(); }
  get in(): IFormattedData { return this._in.value; }

  @Input() titleOverride: string = null;

  @Output() out = new EventEmitter<IFormattedData>();

  constructor(private _dialog: MatDialog) {
  }

  ngOnInit(): void {

  }

  parameterChanged(): void {
    this._parameterChanged.next(true);
  }

  openErrorViewer(error: any): void {
    this._dialog.open(ShowErrorDialogComponent, {
      data: error
    });
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
