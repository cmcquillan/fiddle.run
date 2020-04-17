import { DataFormat, IFormattedData } from './format';

const IDS = {
    Null: 0,
    Any: 1,
    Object: 100,
    Text: 101,
    Error: 500,
};

export const Formats = {
    Null: new DataFormat(IDS.Null, 'Null'),
    Any: new DataFormat(IDS.Any, 'Any'),
    Error: new DataFormat(IDS.Error, 'Error'),
    Text: new DataFormat(IDS.Text, 'Text'),
    Object: new DataFormat(IDS.Object, 'Object'),
};

export const NullFormatted: IFormattedData = {
    value: null,
    format: Formats.Null,
};
