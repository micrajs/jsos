import { parseValue } from './parseValue';
import { findByPath } from './findByPath';
import { defaultTransformers } from '../transformers';
import { JSOSParserElement } from '../../jsosParser/types';
import { JSOSTransformerContext, JSOSTransformerOptions } from '../types';
import { ObjectContent } from '../../content/ObjectContent';
import { StringContent } from '../../content/StringContent';

export const createTransformerContext = <T>(
  elements: JSOSParserElement[],
  options: Partial<JSOSTransformerOptions<T>> = {},
): JSOSTransformerContext => {
  const context =
    options.context ??
    ({ elements } as JSOSTransformerContext);

  if (options.initialValue) {
    if (typeof options.initialValue === 'object') {
      context.content = new ObjectContent(options.initialValue);
    } else {
      context.content = new StringContent(options.initialValue);
    }
  } else {
    context.content = new StringContent();
  }

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
