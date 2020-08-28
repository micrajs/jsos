import { createTransformerContext } from './context/createTransformerContext';
import { JSOSParserElement } from '../jsosParser/types';
import { JSOSTransformer, JSOSTransformerOptions } from './types';

export const jsosTransformer: JSOSTransformer = <T = Record<string, any>>(
  elements: JSOSParserElement[],
  options: Partial<JSOSTransformerOptions<T>> = {},
) => {
  const context = createTransformerContext(elements, options);
  context.transform = jsosTransformer;

  for (const element of elements) {
    if (context.transformers[element.type]) {
      context.transformers[element.type](element, context);
    }
  }

  return context.content();
};