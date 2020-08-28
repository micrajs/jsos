import { JSOSParserDefinition } from '../types';

export const isPrimitive = (
  definition: JSOSParserDefinition,
): definition is
  | string
  | number
  | boolean
  | Array<JSOSParserDefinition>
  | null
  | undefined =>
  ['string', 'number', 'boolean'].includes(typeof definition) ||
  Array.isArray(definition) ||
  definition == null;
