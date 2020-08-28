import {
  BOOLEAN_TYPE,
  DYNAMIC_TYPE,
  LIST_TYPE,
  NODE_TYPE,
  NULLISH_TYPE,
  NUMERIC_TYPE,
  STRING_TYPE,
} from '../constants';
import {
  JSOSParserContext,
  JSOSParserDefinition,
  JSOSParserDynamicType,
  JSOSParserElementType,
  JSOSParserNode,
} from '../types';

export type ReplaceDeepTransformer = (
  value: JSOSParserDefinition,
  options: ReplaceDeepOptions,
) => JSOSParserDefinition;

export interface ReplaceDeepOptions {
  context: JSOSParserContext;
  breadcrumbs?: string;
  transformers?: Partial<Record<JSOSParserElementType, ReplaceDeepTransformer>>;
}

export const defaultReplaceDeepTransformers: Record<
  JSOSParserElementType | JSOSParserDynamicType,
  ReplaceDeepTransformer
> = {
  [NODE_TYPE](definition, options) {
    return replaceDeep(definition as JSOSParserNode, options);
  },
  [DYNAMIC_TYPE](definition, options) {
    return replaceDeep(definition as any, options);
  },
  [STRING_TYPE](definition) {
    return definition;
  },
  [NUMERIC_TYPE](definition) {
    return definition;
  },
  [LIST_TYPE](definition) {
    return definition;
  },
  [BOOLEAN_TYPE](definition) {
    return definition;
  },
  [NULLISH_TYPE](definition) {
    return definition;
  },
};

export const replaceDeep = (
  obj: JSOSParserNode,
  options: ReplaceDeepOptions,
): JSOSParserNode => {
  const result: JSOSParserNode = {};
  const transformers = {
    ...defaultReplaceDeepTransformers,
    ...(options.transformers ?? {}),
  };

  for (const [key, value] of Object.entries(obj)) {
    const breadcrumbs = `${options.breadcrumbs}.${key}` ?? key;
    for (const resolver of options.context.resolvers) {
      if (resolver.check(value)) {
        result[key] = transformers[resolver.type](value, {
          ...options,
          breadcrumbs,
        });
        break;
      }
    }
  }

  return result;
};
