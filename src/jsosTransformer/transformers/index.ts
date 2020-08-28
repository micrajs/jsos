import {
  BOOLEAN_TYPE,
  LIST_TYPE,
  NODE_TYPE,
  NULLISH_TYPE,
  NUMERIC_TYPE,
  STRING_TYPE,
} from '../../jsosParser/constants';
import {
  JSOSParserElementType,
  JSOSParserListElement,
  JSOSParserNodeElement,
} from '../../jsosParser/types';
import { JSOSTransformerFunction } from '../types';

export const defaultTransformers: Record<
  JSOSParserElementType,
  JSOSTransformerFunction
> = {
  [NODE_TYPE](element, context) {
    context.transform((element as JSOSParserNodeElement).value, {
      context,
      transformers: context.transformers,
    });
  },
  [STRING_TYPE]() {
    //
  },
  [NUMERIC_TYPE]() {
    //
  },
  [LIST_TYPE](element, context) {
    context.transform((element as JSOSParserListElement).value, {
      context,
      transformers: context.transformers,
    });
  },
  [BOOLEAN_TYPE]() {
    //
  },
  [NULLISH_TYPE]() {
    //
  },
};
