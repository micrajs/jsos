import {
  BOOLEAN_TYPE,
  LIST_TYPE,
  NULLISH_TYPE,
  NUMERIC_TYPE,
  STRING_TYPE,
} from '../constants';
import { isPrimitive } from '../helpers/isPrimitive';
import { replaceDeep, ReplaceDeepTransformer } from '../helpers/replaceDeep';
import { JSOSParserContext, JSOSParserValueDefinition } from '../types';

const breadcrumbsToGet: ReplaceDeepTransformer = (_, { breadcrumbs }) =>
  `get::${breadcrumbs}`;

export const get = (context: JSOSParserContext) => (
  path: string,
): JSOSParserValueDefinition => {
  let definition = context.raw;
  for (const key of path.split('.')) {
    if (
      isPrimitive(definition) ||
      (typeof definition !== 'function' && !definition[key])
    ) {
      return path;
    }

    definition =
      typeof definition === 'function' ? definition(context) : definition[key];
  }

  const value =
    typeof definition === 'function' ? definition(context) : definition;

  if (isPrimitive(value)) {
    return `get::${path}`;
  }

  return replaceDeep(value, {
    context,
    breadcrumbs: path,
    transformers: {
      [STRING_TYPE]: breadcrumbsToGet,
      [NUMERIC_TYPE]: breadcrumbsToGet,
      [LIST_TYPE]: breadcrumbsToGet,
      [BOOLEAN_TYPE]: breadcrumbsToGet,
      [NULLISH_TYPE]: breadcrumbsToGet,
    },
  });
};
