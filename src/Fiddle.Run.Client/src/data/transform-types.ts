import { Formats } from './format-types';
import { TransformParameter, Transform, TransformFunction } from './transforms';
import Base64 from './base64';

const parseJSON: TransformFunction = (ctx) => {
    let parsed = JSON.parse(ctx.data.value);
    ctx.setData(parsed, Formats.Object);

    return true;
}

const formatJSON: TransformFunction = (ctx) => {
    ctx.setData(JSON.stringify(ctx.data.value, null, 4), Formats.Text);
    return true;
}

const textInput: TransformFunction = (ctx) => {
    const val = ctx.params.input || '';
    ctx.setData(val, Formats.Text);
    return true;
}

const textOutput: TransformFunction = (ctx) => {
    ctx.setData(ctx.data.value, ctx.data.format, 'output');
    return true;
}

const base64Encode: TransformFunction = (ctx) => {
    const mode = ctx.params.mode;
    if (mode === 'encode') {
        ctx.setData(Base64.encode(ctx.data.value || ''), Formats.Text);
    } else {
        ctx.setData(Base64.decode(ctx.data.value || ''), Formats.Text);
    }

    return true;
}

const urlEncode: TransformFunction = (ctx) => {
    const mode = ctx.params.mode;
    if (mode === 'encode') {
        ctx.setData(encodeURIComponent(ctx.data.value || ''), Formats.Text);
    } else {
        ctx.setData(decodeURIComponent(ctx.data.value || ''), Formats.Text);
    }

    return true;
}

const appendString: TransformFunction = (ctx) => {
    ctx.setData(`${ctx.data.value}${ctx.params.text}`, Formats.Text);
    return true;
}

const noop: TransformFunction = (ctx) => {
    return true;
}

export class TransformFactory {
    static createParseJSON(): Transform {
        return new Transform(Formats.Text, Formats.Object, 'Parse JSON', parseJSON);
    }

    static createFormatJSON(): Transform {
        return new Transform(Formats.Object, Formats.Text, 'Format as JSON', formatJSON);
    }

    static createNoop(): Transform {
        return new Transform(Formats.Text, Formats.Text, 'Noop', noop);
    }

    static createTextInput(): Transform {
        return new Transform(Formats.Text, Formats.Text, 'Input Text', textInput, [
            new TransformParameter('input', 'text', '', 'Text to Transform')
        ]);
    }

    static createTextOutput(): Transform {
        return new Transform(Formats.Text, Formats.Text, 'Output Text', textOutput, [], ['default', 'output']);
    }

    static createBase64Encode(): Transform {
        return new Transform(Formats.Text, Formats.Text, 'Base 64', base64Encode, [
            new TransformParameter('mode', 'select', 'encode', 'Encode/Decode', {
                values: [
                    { value: 'encode', display: 'Encode' },
                    { value: 'decode', display: 'Decode' }
                ]
            })
        ]);
    }

    static createUriEncode(): Transform {
        return new Transform(Formats.Text, Formats.Text, 'URI Encoder', urlEncode, [
            new TransformParameter('mode', 'select', 'encode', 'Encode/Decode', {
                values: [
                    { value: 'encode', display: 'Encode' },
                    { value: 'decode', display: 'Decode' }
                ]
            })
        ])
    }

    static appendString(): Transform {
        return new Transform(Formats.Text, Formats.Text, 'Append String', appendString, [
            new TransformParameter('text', 'text', '', 'Append String'),
        ]);
    }
}
