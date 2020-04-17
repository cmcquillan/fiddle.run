import { Formats } from './format-types';
import { TransformParameter, ITransform } from './transforms';
import Base64 from './base64';

export class TransformFactory {
    static createParseJSON(): ITransform {
        return {
            in: Formats.Text,
            out: Formats.Object,
            func: (ctx) => {
                try {
                    let parsed = JSON.parse(ctx.data.value);
                    ctx.setData(parsed, Formats.Object);
                } catch {
                    ctx.setData({}, Formats.Object);
                }
                return true;
            },
            name: 'Parse JSON'
        };
    }

    static createFormatJSON(): ITransform {
        return {
            in: Formats.Object,
            out: Formats.Text,
            func: (ctx) => {
                ctx.setData(JSON.stringify(ctx.data.value, null, 4), Formats.Text);
                return true;
            },
            name: 'Format as JSON'
        };
    }

    static createNoop(): ITransform {
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

    static createTextInput(): ITransform {
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

    static createTextOutput(): ITransform {
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

    static createBase64Encode(): ITransform {
        return {
            in: Formats.Text,
            out: Formats.Text,
            func: (ctx) => {

                const mode = ctx.transform.params.mode.value;
                console.log('data: ', ctx.transform.params.mode);
                console.log('mode: ', mode);
                if (mode === 'encode') {
                    ctx.setData(Base64.encode(ctx.data.value), Formats.Text);
                } else {
                    ctx.setData(Base64.decode(ctx.data.value), Formats.Text);
                }

                return true;
            },
            name: 'Base 64',
            params: {
                mode: new TransformParameter('select', 'encode', 'Encode/Decode', {
                    values: [
                        { value: 'encode', display: 'Encode' },
                        { value: 'decode', display: 'Decode' }
                    ]
                })
            }
        };
    }

    static createBase64Decode(): ITransform {
        return {
            in: Formats.Text,
            out: Formats.Text,
            func: (ctx) => {
                return true;
            },
            name: 'Base 64 Decode'
        };
    }
}
