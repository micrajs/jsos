import { Content } from './types';

export class ObjectContent implements Content<Record<string, any>> {
  value: Record<string, any>;

  constructor(initialValue: Record<string, any> = {}) {
    this.value = initialValue;
  }

  append(path: string, value: any): this {
    if (path == null || path === '') {
      throw new Error('Path parameter is required to set content.');
    }

    const pieces = path.split('.');
    const key = pieces.pop() as string;

    pieces.reduce((deep, piece) => {
      if (Object.keys(deep).includes(piece)) {
        if (typeof deep[piece] !== 'object' || deep[piece] === null) {
          throw new Error(`Cannot overwrite value with path. "${piece}" on "${path}" is already defined as a value.`);
        }
      } else {
        deep[piece] = {};
      }

      return deep[piece];
    }, this.value)[key] = value;

    return this;
  }

  prepend(path: string, value: any): this {
    this.append(path, value);
    return this;
  }
}
