import { Injectable } from '@angular/core';
import { ITransformMap, ParameterType, TransformParameter } from 'src/data/transforms';
import { Formats } from 'src/data/format-types';
import Base64 from 'src/data/base64';
import { Transform } from 'stream';

@Injectable({
  providedIn: 'root'
})
export class TransformStoreService {
  private readonly _transforms: ITransformMap = {
    textInput: {
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
    },
    textOutput: {
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
    },
    atob: {
      in: Formats.Text,
      out: Formats.Text,
      func: (ctx) => {
        ctx.setData(Base64.encode(ctx.data.value), Formats.Text);
        return true;
      },
      name: 'Base 64 Encode'
    },
    btoa: {
      in: Formats.Text,
      out: Formats.Text,
      func: (ctx) => {
        ctx.setData(Base64.decode(ctx.data.value), Formats.Text);
        return true;
      },
      name: 'Base 64 Decode'
    }
  };

  constructor() { }

  list(): string[] {
    return Object.keys(this._transforms);
  }

  get(id: string) {
    return this._transforms[id];
  }
}
