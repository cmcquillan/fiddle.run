import { DataFormat, IFormattedData } from './format';

const IDS = {
    Null: 0,
    Any: 1,
    Text: 101,
    Error: 500,
};

export const Formats = {
    Null: new DataFormat(IDS.Null, 'Null'),
    Any: new DataFormat(IDS.Any, 'Any'),
    Error: new DataFormat(IDS.Error, 'Error'),
    Text: new DataFormat(IDS.Text, 'Text'),
};

export const NullFormatted: IFormattedData = {
    value: null,
    format: Formats.Null,
};
