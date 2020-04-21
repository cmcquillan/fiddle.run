import { Component, OnInit, Input } from '@angular/core';
import { TransformStoreService } from 'src/app/services/transform-store.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'fiddle-chain-transform',
  templateUrl: './chain-transform.component.html',
  styleUrls: ['./chain-transform.component.scss']
})
export class ChainTransformComponent implements OnInit {
  private _transforms: string[];
  boxes: Subject<any>[] = [];

  get transforms(): string[] { return this._transforms; }
  @Input() set transforms(val: string[]) {
    this.boxes = Array(val.length);

    for (let i = 0; i < val.length; i++) {
      this.boxes[i] = new Subject<any>();
    }

    this._transforms = val;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
