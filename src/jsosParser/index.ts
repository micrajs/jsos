import { createParserContext } from './context/createParserContext';
import { JSOSParser, JSOSParserDefinition, JSOSParserOptions } from './types';

export const jsosParser: JSOSParser = <T = Record<string, any>>(
  definition: JSOSParserDefinition,
  options: Partial<JSOSParserOptions<T>> = {},
) => {
  const elements = options.elements ?? [];
  const context = createParserContext(definition, options);

  for (const resolver of context.resolvers) {
    if (resolver.check(definition)) {
      elements.push(resolver.resolve(definition, context));
      break;
    }
  }

  return elements;
};
