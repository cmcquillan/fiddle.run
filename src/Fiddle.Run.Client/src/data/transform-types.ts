import { Formats } from './format-types';
import { TransformParameter } from './transforms';
import Base64 from './base64';

export class TransformFactory {
    static createNoop() {
        return {
            in: Formats.Text,
            out: Formats.Text,
            func: (ctx) => {
                ctx.setData(ctx.data.value, ctx.data.format);
                return true;
            },
            name: 'Noop',
        };
    }

    static createTextInput() {
        return {
            in: Formats.Text,
            out: Formats.Text,
            func: (ctx) => {
                const val = ctx.transform.params.input.value || '';
                ctx.setData(val, Formats.Text);
                return true;
            },
            name: 'Input Text',
            params: {
                input: new TransformParameter('text', '', 'Text to Transform')
            }
        };
    }

    static createTextOutput() {
        return {
            in: Formats.Text,
            out: Formats.Text,
            func: (ctx) => {
                ctx.transform.params.output.next(ctx.data.value);
                ctx.setData(ctx.data.value, ctx.data.format);
                return true;
            },
            name: 'Output Text',
            params: {
                output: new TransformParameter('out', null, 'Transformed Text')
            }
        };
    }

    static createBase64Encode() {
        return {
            in: Formats.Text,
            out: Formats.Text,
            func: (ctx) => {
                ctx.setData(Base64.encode(ctx.data.value), Formats.Text);
                return true;
            },
            name: 'Base 64 Encode'
        };
    }

    static createBase64Decode() {
        return {
            in: Formats.Text,
            out: Formats.Text,
            func: (ctx) => {
                ctx.setData(Base64.decode(ctx.data.value), Formats.Text);
                return true;
            },
            name: 'Base 64 Decode'
        };
    }
}
