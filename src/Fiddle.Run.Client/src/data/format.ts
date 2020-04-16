import { Formats } from './format-types';

export interface IFormat {
    id: number;
    name: string;
}

export class DataFormat implements IFormat {
    constructor(
        public id: number,
        public name: string) {
    }
}

export interface IFormattedData {
    value: any;
    format: IFormat;
}

export class Data implements IFormattedData {
    constructor(
        public value: any,
        public format: IFormat) {
    }
}
