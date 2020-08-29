import { writer } from './writer';
import { parseValue } from './parseValue';
import { findByPath } from './findByPath';
import { defaultTransformers } from '../transformers';
import { JSOSParserElement } from '../../jsosParser/types';
import { JSOSTransformerContext, JSOSTransformerOptions } from '../types';

export const createTransformerContext = <T>(
  elements: JSOSParserElement[],
  options: Partial<JSOSTransformerOptions<T>> = {},
): JSOSTransformerContext => {
  const context =
    options.context ??
    ({
      elements,
      ...writer(),
    } as JSOSTransformerContext);

  context.findByPath = findByPath(context);
  context.parseValue = parseValue(context, options.valueParsers);
  context.transformers = {
    ...defaultTransformers,
    ...(options.transformers ?? {}),
  };

  return options.makeContext
    ? { ...context, ...options.makeContext(context) }
    : context;
};
