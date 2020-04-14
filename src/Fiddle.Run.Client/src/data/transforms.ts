import { IFormattedData, IFormat, Data } from './format';
import { ReplaySubject, Observable } from 'rxjs';
import { Formats } from './format-types';

export interface ITransformMap {
    [name: string]: ITransform;
}

export interface ITransformContext {
    data: IFormattedData;
    transform: IFormattedData;
    setData(value: any, format: IFormat): void;
}

export class TransformContext implements ITransformContext {
    private _transform: IFormattedData = null;
    private _transformSubject = new ReplaySubject<IFormattedData>(1);

    constructor(
        public data: IFormattedData
    ) { }

    setData(value: any, format: IFormat): void {
        this._transform = new Data(value, format);
        this._transformSubject.next(this._transform);
    }

    get transform(): IFormattedData {
        return this._transform;
    }

    asObservable(): Observable<IFormattedData> {
        return this._transformSubject.asObservable();
    }
}

export class ErrorContext extends TransformContext {
    constructor(data: IFormattedData, error: any) {
        super(data);
        this.setData(error, Formats.Error);
    }
}

export interface ITransform {
    in: IFormat;
    func: (ctx: ITransformContext) => boolean;
    out: IFormat;
}
