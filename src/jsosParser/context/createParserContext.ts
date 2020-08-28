import { get } from './get';
import { defaultResolvers } from '../resolvers';
import {
  JSOSParserContext,
  JSOSParserDefinition,
  JSOSParserOptions,
} from '../types';

export const createParserContext = (
  raw: JSOSParserDefinition,
  options: Partial<JSOSParserOptions> = {},
): JSOSParserContext => {
  const context =
    options.context ??
    ({
      raw,
      breadcrumbs: '',
      resolvers: (options.resolvers ?? []).concat(defaultResolvers),
    } as JSOSParserContext);

  context.get = get(context);

  return options.makeContext
    ? { ...context, ...options.makeContext(context) }
    : context;
};
