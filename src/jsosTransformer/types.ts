import { JSOSParserElement, JSOSParserElementType } from '../jsosParser/types';
import { ParseValue, ValueParser } from './context/parseValue/types';

export interface JSOSTransformerContext {
  elements: JSOSParserElement[];
  transform: JSOSTransformer;
  transformers: Record<JSOSParserElementType, JSOSTransformerFunction>;
  parseValue: ParseValue;
  content(): string;
  prepend(value: string): string;
  append(value: string): string;
  findByPath(
    path: string,
    elements?: JSOSParserElement[],
  ): JSOSParserElement | undefined;
}

export type JSOSTransformerFunction = (
  element: JSOSParserElement,
  context: JSOSTransformerContext,
) => void;

export interface JSOSTransformerOptions<T = Record<string, any>> {
  valueParsers: Record<string, ValueParser>;
  transformers: Partial<Record<JSOSParserElementType, JSOSTransformerFunction>>;
  makeContext?(context: JSOSTransformerContext): T;
  context: JSOSTransformerContext | (JSOSTransformerContext & T);
}

export type JSOSTransformer = <T = Record<string, any>>(
  elements: JSOSParserElement[],
  options?: Partial<JSOSTransformerOptions<T>>,
) => string;