import { Directive, Input } from '@angular/core';
import { TransformBoxComponent } from '../components/transform-box/transform-box.component';
import { BehaviorSubject } from 'rxjs';
import { TransformStoreService } from '../services/transform-store.service';

@Directive({
  selector: 'fiddle-transform-box[applyTransform]'
})
export class TransformApplierDirective {
  constructor(
    private _store: TransformStoreService,
    private _host: TransformBoxComponent) {
  }

  @Input() set apply(val: string) {
    console.log(val);
    const transform = this._store.get(val);
    this._host.transform = transform;
  }

  get apply(): string {
    return this._host.transform.name;
  }
}
