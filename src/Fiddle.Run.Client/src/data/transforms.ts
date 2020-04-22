import { Observable, BehaviorSubject, Subject, combineLatest, Subscription, of } from 'rxjs';
import { map, tap, publish, refCount } from 'rxjs/operators';

import { IFormattedData, IFormat, Data } from './format';
import { Formats, NullFormatted } from './format-types';

export interface TransformMap {
    [name: string]: () => Transform;
}

export interface IDataMap {
    [name: string]: any;
}

export class TransformContext {
    private _transformedValue = {};

    constructor(
        public data: IFormattedData,
        public transform: Transform,
        public params: IDataMap,
    ) {
    }

    setData(value: any, format: IFormat, streamName: string = 'default'): void {
        this._transformedValue[streamName] = new Data(value, format);
    }

    get transformedValue(): IFormattedData {
        return this._transformedValue['default'];
    }

    getOutputNames() {
        return Object.keys(this._transformedValue);
    }

    getOutputValue(streamName: string = 'default') {
        return this._transformedValue[streamName];
    }

    get inputIsNull(): boolean {
        return this.data === NullFormatted;
    }
}

export class ErrorContext extends TransformContext {
    constructor(data: IFormattedData, error: any) {
        super(data, null, {});
        this.setData(error, Formats.Error);
    }
}

export type ParameterType = 'text' | 'function' | 'number' | 'out' | 'select';

export class TransformParameter {
    private readonly _value: BehaviorSubject<any>;
    private readonly _value$: Observable<any>;

    constructor(
        public name: string,
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

export type TransformFunction = (ctx: TransformContext) => boolean;

export interface TransformError {
    message: string;
}

interface OutputData {
    name: string;
    data: any;
}

export class Transform {
    private readonly _outputStream: {
        [name: string]: BehaviorSubject<IFormattedData>;
    } = {};
    private readonly _errorStream = new Subject<TransformError>();
    private readonly _errorStream$ = this._errorStream.asObservable();
    private _subscription = new Subscription();
    private _inputStream: Observable<IFormattedData>;

    constructor(
        private readonly _in: IFormat,
        private readonly _out: IFormat,
        private readonly _name: string,
        private readonly _func: TransformFunction,
        private readonly _params: TransformParameter[] = [],
        private readonly _outputs: string[] = ['default']) {
        for (let i = 0; i < _outputs.length; i++) {
            this._outputStream[_outputs[i]] = new BehaviorSubject<IFormattedData>(NullFormatted);
        }
    }

    get func(): TransformFunction {
        return this._func;
    }

    get in(): IFormat {
        return this._in;
    }

    get out(): IFormat {
        return this._out;
    }

    get name(): string {
        return this._name;
    }

    get params(): TransformParameter[] {
        return this._params;
    }

    get outputs(): string[] {
        return this._outputs;
    }

    connectEmptyInputStream() {
        this._inputStream = of(NullFormatted);
        this.setupInput();
    }

    connectInputStream(input: Observable<IFormattedData>) {
        this._inputStream = input;
        this.setupInput();
    }

    disconnect() {
        this._subscription.unsubscribe();
    }

    getOutputStream(name: string = 'default'): Observable<any> {
        return this._outputStream[name].asObservable();
    }

    getErrorStream(): Observable<TransformError> {
        return this._errorStream$;
    }

    private setupInput() {
        this._subscription.unsubscribe();
        this._subscription = new Subscription();

        let paramData: Observable<IDataMap> = null;
        if (this.params.length > 0) {
            paramData = combineLatest(this._params.map(p => p.value$.pipe(
                map((data) => {
                    return { name: p.name, value: data };
                })
            ))).pipe(
                map((dataArray) => {
                    const map = {};
                    for (let i = 0; i < dataArray.length; i++) {
                        map[dataArray[i].name] = dataArray[i].value;
                    }
                    return map;
                }),
            );
        } else {
            paramData = of({});
        }

        const outputStream = combineLatest(this._inputStream, paramData).pipe(
            map(([inputData, paramData]) => {

                const ctx = new TransformContext(inputData, this, paramData);
                if (!this._func(ctx)) {
                    this._errorStream.next({ message: 'Failure when transforming data.' });
                }

                return ctx;
            }),
            tap((ctx) => {
                ctx.getOutputNames().forEach((val) => this.pushOutput(val, ctx.getOutputValue(val)));
            }),
            map((ctx) => ctx.transformedValue),
            publish(),
            refCount()
        );

        this._subscription.add(outputStream.subscribe());
    }

    pushOutput(streamName: string, outputData: any) {
        this._outputStream[streamName].next(outputData);
    }
}