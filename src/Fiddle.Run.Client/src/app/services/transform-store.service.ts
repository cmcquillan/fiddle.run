import { Injectable } from '@angular/core';
import { ITransformMap } from 'src/data/transforms';
import { Formats } from 'src/data/format-types';
import Base64 from 'src/data/base64';

@Injectable({
  providedIn: 'root'
})
export class TransformStoreService {
  private readonly _transforms: ITransformMap = {
    textInput: {
      in: Formats.Text,
      out: Formats.Text,
      func: (ctx) => {
        console.log(ctx.data.value);
        return true;
      }
    },
    textOutput: {
      in: Formats.Text,
      out: Formats.Text,
      func: (ctx) => {
        console.log(ctx.data.value);
        ctx.setData(ctx.data.value, ctx.data.format);
        return true;
      }
    },
    atob: {
      in: Formats.Text,
      out: Formats.Base64String,
      func: (ctx) => {
        ctx.setData(Base64.encode(ctx.data.value), Formats.Base64String);
        return true;
      }
    },
    btoa: {
      in: Formats.Base64String,
      out: Formats.Text,
      func: (ctx) => {
        ctx.setData(Base64.decode(ctx.data.value), Formats.Text);
        return true;
      }
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
