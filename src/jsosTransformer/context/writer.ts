export interface WriterInterface {
  content(): string;
  prepend(value: string): string;
  append(value: string): string;
}

export const writer = (initial = ''): WriterInterface => {
  let partial = initial;
  return {
    content() {
      return partial;
    },
    prepend(value: string) {
      partial = `${value}${partial}`;
      return partial;
    },
    append(value: string) {
      partial = `${partial}${value}`;
      return partial;
    },
  };
};
