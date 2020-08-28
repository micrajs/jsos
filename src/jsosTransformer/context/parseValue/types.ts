import { JSOSTransformerContext } from '../../types';
import {
  JSOSParserElement,
  JSOSParserPrimitiveDefinition,
} from '../../../jsosParser/types';

export type ParserArgs = (string | JSOSTransformerContext)[];
export type ParseValueVisitor = (
  value: JSOSParserPrimitiveDefinition | JSOSParserElement[],
  meta: Record<
    string,
    string | JSOSTransformerContext | ParserArgs | Record<string, ValueParser>
  >,
) => string;
export type ParseValue = (
  value: JSOSParserPrimitiveDefinition | JSOSParserElement[],
  visitors?: Record<string, ParseValueVisitor>,
) => JSOSParserPrimitiveDefinition | JSOSParserElement[];
export type ParseValueGenerator = (
  context: JSOSTransformerContext,
  visitors?: Record<string, ValueParser>,
) => ParseValue;
export type ValueParser = (...args: ParserArgs) => string;
