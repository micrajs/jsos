import { valueParsers } from './valueParsers';
import { ParserArgs, ParseValueGenerator } from './types';

export const parseValue: ParseValueGenerator = (
  context,
  customParsers = {},
) => {
  const parsers = { ...valueParsers, ...customParsers };

  return (value, visitors = {}) => {
    if (typeof value === 'string' && value.includes('::')) {
      const [fn, ...args] = value.split('::');
      if (parsers[fn]) {
        const fnArgs: ParserArgs = [
          ...args
            .join('::')
            .split('|')
            .map(
              (a) => parseValue(context, customParsers)(a, visitors) as string,
            ),
          context,
        ];

        const result = parsers[fn](...fnArgs);

        return visitors[fn]
          ? visitors[fn](result, {
              fn,
              value,
              context,
              args: fnArgs,
              parsers,
            })
          : result;
      }

      throw new SyntaxError(`Parser "${fn}" not defined`);
    }

    return visitors.value ? visitors.value(value, {}) : value;
  };
};
