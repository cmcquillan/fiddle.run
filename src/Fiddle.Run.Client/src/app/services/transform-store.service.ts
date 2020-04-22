import { Injectable } from '@angular/core';
import { TransformMap } from 'src/data/transforms';
import { TransformFactory } from 'src/data/transform-types';

@Injectable({
  providedIn: 'root'
})
export class TransformStoreService {
  private readonly _transforms: TransformMap = {
    textInput: TransformFactory.createTextInput,
    textOutput: TransformFactory.createTextOutput,
    atob: TransformFactory.createBase64Encode,
    parseJSON: TransformFactory.createParseJSON,
    formatJSON: TransformFactory.createFormatJSON,
    appendString: TransformFactory.appendString,
  };

  constructor() { }

  list(): string[] {
    return Object.keys(this._transforms);
  }

  get(id: string) {
    return this._transforms[id]();
  }
}
