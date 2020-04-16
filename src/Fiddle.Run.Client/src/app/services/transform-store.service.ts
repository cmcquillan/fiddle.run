import { Injectable } from '@angular/core';
import { ITransformMap } from 'src/data/transforms';
import { TransformFactory } from 'src/data/transform-types';

@Injectable({
  providedIn: 'root'
})
export class TransformStoreService {
  private readonly _transforms: ITransformMap = {
    textInput: TransformFactory.createTextInput,
    textOutput: TransformFactory.createTextOutput,
    atob: TransformFactory.createBase64Encode,
    btoa: TransformFactory.createBase64Decode
  };

  constructor() { }

  list(): string[] {
    return Object.keys(this._transforms);
  }

  get(id: string) {
    return this._transforms[id]();
  }
}
