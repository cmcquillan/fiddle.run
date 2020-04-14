import { DataFormat } from './format';

const IDS = {
    Error: 1,
    Base64String: 100,
    Text: 101,
};

export const Formats = {
    Error: new DataFormat(IDS.Error, "Error"),
    Base64String: new DataFormat(IDS.Base64String, "Base 64 String"),
    Text: new DataFormat(IDS.Text, "Text"),
};