import { IFormattedData, IFormat, Data } from './format';
import { ReplaySubject, Observable, BehaviorSubject } from 'rxjs';
import { Formats, NullFormatted } from './format-types';

export interface ITransformMap {
    [name: string]: () => ITransform;
}

export interface ITransformContext {
    data: IFormattedData;
    transform: ITransform;
    transformedValue: IFormattedData;
    setData(value: any, format: IFormat): void;
}

export class TransformContext implements ITransformContext {
    private _transform: IFormattedData = null;
    private _transformSubject = new ReplaySubject<IFormattedData>(1);


    constructor(
        public data: IFormattedData,
        public transform: ITransform,
    ) {
    }

    setData(value: any, format: IFormat): void {
        this._transform = new Data(value, format);
        this._transformSubject.next(this._transform);
    }

    get transformedValue(): IFormattedData {
        return this._transform;
    }

    get inputIsNull(): boolean {
        return this.data === NullFormatted;
    }

    asObservable(): Observable<IFormattedData> {
        return this._transformSubject.asObservable();
    }
}

export class ErrorContext extends TransformContext {
    constructor(data: IFormattedData, error: any) {
        super(data, null);
        this.setData(error, Formats.Error);
    }
}

export type ParameterType = 'text' | 'function' | 'number' | 'out' | 'select';

export class TransformParameter {
    private readonly _value: BehaviorSubject<any>;
    private readonly _value$: Observable<any>;

    constructor(
        public type: ParameterType,
        defaultValue?: any,
        public prompt?: string,
        public opts?: any) {
        this._value = new BehaviorSubject<any>(defaultValue);
        this._value$ = this._value.asObservable();
    }

    next(value: any) { this._value.next(value); }

    get value(): any { return this._value.value; }
    set value(data: any) { this.next(data); }

    get value$(): Observable<any> { return this._value$; }
}

export interface ITransform {
    in: IFormat;
    func: (ctx: ITransformContext) => boolean;
    out: IFormat;
    name: string;
    params?: {
        [key: string]: TransformParameter;
    };
}
