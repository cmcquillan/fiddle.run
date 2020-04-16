import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITransform, TransformContext, ErrorContext } from 'src/data/transforms';
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
  private readonly _transform = new BehaviorSubject<ITransform>(TransformFactory.createNoop());
  private readonly _in = new BehaviorSubject<IFormattedData>(NullFormatted);
  private readonly _parameterChanged = new BehaviorSubject<boolean>(true);
  private _sub: Subscription = null;

  transform$ = this._transform.asObservable();
  in$ = this._in.asObservable();
  parameterChanged$ = this._parameterChanged.asObservable();

  @Input() set transform(value: ITransform) { this._transform.next(value); }
  get transform(): ITransform { return this._transform.value; }

  @Input() set in(value: IFormattedData) { this._in.next(value); this.parameterChanged(); }
  get in(): IFormattedData { return this._in.value; }

  @Output() out = new EventEmitter<IFormattedData>();

  constructor() {
    const inputs = combineLatest(this.in$, this.transform$, this.parameterChanged$);
    this._sub = inputs.pipe(
      map(([value, transform]) => {
        if (transform && value) {
          if (transform.in.id === value.format.id
            || value === NullFormatted
            || value.format.id == Formats.Any.id) {

            const ctx = new TransformContext(value, transform);
            if (transform.func(ctx)) {
              return ctx;
            }
            return new ErrorContext(value, { error: 'Could not transform data' });
          }
          return new ErrorContext(value, { error: 'Mismatch in formats' });
        }
        return new ErrorContext(value, { error: 'Data not available' });
      })
    ).subscribe(
      (result) => {
        this.out.emit(result.transformedValue);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {

  }

  parameterChanged(): void {
    this._parameterChanged.next(true);
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
