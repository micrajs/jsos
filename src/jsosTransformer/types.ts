import { Content } from '../content/types';
import { JSOSParserElement, JSOSParserElementType } from '../jsosParser/types';
import { ParseValue, ValueParser } from './context/parseValue/types';

export interface JSOSTransformerContext {
  elements: JSOSParserElement[];
  transform: JSOSTransformer;
  transformers: Record<JSOSParserElementType, JSOSTransformerFunction>;
  parseValue: ParseValue;
  content: Content<string | Record<string | number, any>>;
  findByPath(
    path: string,
    elements?: JSOSParserElement[],
  ): JSOSParserElement | undefined;
}

export type JSOSTransformerFunction<T = any> = (
  element: JSOSParserElement,
  context: JSOSTransformerContext & T,
  options?: Partial<JSOSTransformerOptions<T>>,
) => void;

export interface JSOSTransformerOptions<T = Record<string, any>> {
  valueParsers: Record<string, ValueParser>;
  transformers: Partial<
    Record<JSOSParserElementType, JSOSTransformerFunction<T>>
  >;
  makeContext?(context: JSOSTransformerContext): T;
  context: JSOSTransformerContext | (JSOSTransformerContext & T);
  initialValue?: string | Record<string | number, any>;
}

export type JSOSTransformer = <T = Record<string, any>, R = string | Record<string | number, any>>(
  elements: JSOSParserElement[],
  options?: Partial<JSOSTransformerOptions<T>>,
) => R;
