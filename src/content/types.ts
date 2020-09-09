export interface Content<T> {
  value: T;
  append(...value: any[]): this;
  prepend(...value: any[]): this;
}
