import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';

import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ITransform, TransformContext, ITransformContext, ErrorContext } from 'src/data/transforms';
import { IFormattedData } from 'src/data/format';
import { Transforms } from 'src/data/transform-types';

@Component({
  selector: 'fiddle-transform-box',
  templateUrl: './transform-box.component.html',
  styleUrls: ['./transform-box.component.scss']
})
export class TransformBoxComponent implements OnInit, OnDestroy {
  private readonly _transform = new BehaviorSubject<ITransform>(Transforms.Noop);
  private readonly _in = new BehaviorSubject<IFormattedData>(null);
  private _sub: Subscription = null;

  transform$ = this._transform.asObservable();
  in$ = this._in.asObservable();

  @Input() set transform(value: ITransform) { this._transform.next(value); }
  get transform(): ITransform { return this._transform.value; }

  @Input() set in(value: IFormattedData) { this._in.next(value); }
  get in(): IFormattedData { return this._in.value; }

  @Output() out = new EventEmitter<IFormattedData>();

  constructor() {
    const inputs = combineLatest(this.in$, this.transform$);
    this._sub = inputs.pipe(
      map(([value, transform]) => {
        console.log('entered', value, transform);
        let error: string = null;

        if (transform && value) {
          console.log(transform.in, value, value.format);
          if (transform.in.id === value.format.id) {
            console.log('transforms match');
            var ctx = new TransformContext(value)
            if (transform.func(ctx)) {
              return ctx;
            }

            error = 'Could not transform data';
          }

          error = 'Mismatch in formats';
        }

        error = 'Data not available';
        return new ErrorContext(value, { error: error });
      })
    ).subscribe(
      (result) => {
        console.log(result);
        this.out.emit(result.transform);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }
}
