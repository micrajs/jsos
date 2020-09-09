import { Content } from './types';

export class StringContent implements Content<string> {
  value: string;

  constructor(initialValue: string = '') {
    this.value = initialValue;
  }

  append(value: string): this {
    this.value = this.value + value;
    return this;
  }

  prepend(value: string): this {
    this.value = value +  this.value;
    return this;
  }
}
