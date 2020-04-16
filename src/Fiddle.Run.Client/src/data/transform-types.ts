import { Formats } from './format-types';

export const Transforms = {
    Noop: {
        in: Formats.Text,
        out: Formats.Text,
        func: (ctx) => {
            ctx.setData(ctx.data.value, ctx.data.format);
            return true;
        },
        name: 'Noop',
    },
};