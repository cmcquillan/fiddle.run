import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pipeline } from 'src/data/pipeline';
import { TransformStoreService } from 'src/app/services/transform-store.service';

@Component({
  selector: 'fiddle-chain-transform',
  templateUrl: './chain-transform.component.html',
  styleUrls: ['./chain-transform.component.scss']
})
export class ChainTransformComponent implements OnInit {
  private readonly _pipeline = new BehaviorSubject<Pipeline>(null);
  private _transforms: string[];

  get pipeline$(): Observable<Pipeline> { return this._pipeline.asObservable(); }

  get transforms(): string[] { return this._transforms; }
  @Input() set transforms(val: string[]) {
    this._transforms = val;

    const trArray = [];
    for (let i = 0; i < this._transforms.length; i++) {
      trArray[i] = this._store.get(this._transforms[i]);
    }

    this._pipeline.next(new Pipeline(trArray));
  }

  @Input() inputTitle: string = null;
  @Input() outputTitle: string = null;

  constructor(private readonly _store: TransformStoreService) {
  }

  ngOnInit(): void {
  }

}
