import { Transform } from './transforms';
import { Subscription } from 'rxjs';

export class Pipeline {
    private readonly _subscription = new Subscription();
    constructor(private _transforms: Transform[]) {
        for (let i = 0; i < _transforms.length; i++) {
            if (i > 0) {
                const out = _transforms[i - 1].getOutputStream();
                _transforms[i].connectInputStream(out);
            }
        }

        _transforms[0].connectEmptyInputStream();
        this._subscription.add(
            _transforms[_transforms.length - 1].getOutputStream().subscribe());
    }

    get transforms(): Transform[] { return this._transforms; }

    disconnect() {
        for (let i = 0; i < this._transforms.length; i++) {
            this._transforms[i].disconnect();
        }
        this._subscription.unsubscribe();
    }
}