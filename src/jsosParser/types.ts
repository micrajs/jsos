export type JSOSParserElementType =
  | 'NodeType'
  | 'StringType'
  | 'NumericType'
  | 'ListType'
  | 'BooleanType'
  | 'NullishType';

export interface JSOSParserContext {
  raw: JSOSParserDefinition;
  breadcrumbs: string;
  resolvers: JSOSParserResolver[];
  get(path: string): JSOSParserValueDefinition;
}

export type JSOSParserDynamicDefinition = (
  context: JSOSParserContext,
) => JSOSParserValueDefinition;

export type JSOSParserPrimitiveDefinition =
  | string
  | number
  | null
  | undefined
  | boolean;

export type JSOSParserValueDefinition =
  | JSOSParserNode
  | Array<JSOSParserDefinition>
  | JSOSParserPrimitiveDefinition;

export type JSOSParserDefinition =
  | JSOSParserDynamicDefinition
  | JSOSParserValueDefinition;

export interface JSOSParserNode {
  [key: string]: JSOSParserDefinition;
  [key: number]: JSOSParserDefinition;
}

export interface JSOSParserNodeElement {
  type: 'NodeType';
  path: string;
  parent?: JSOSParserElement;
  value: JSOSParserElement[];
}

export interface JSOSParserStringElement {
  type: 'StringType';
  path: string;
  parent?: JSOSParserElement;
  value: string;
}

export interface JSOSParserNumericElement {
  type: 'NumericType';
  path: string;
  parent?: JSOSParserElement;
  value: number;
}

export interface JSOSParserListElement {
  type: 'ListType';
  path: string;
  parent?: JSOSParserElement;
  value: JSOSParserElement[];
}

export interface JSOSParserBooleanElement {
  type: 'BooleanType';
  path: string;
  parent?: JSOSParserElement;
  value: boolean;
}

export interface JSOSParserNullishElement {
  type: 'NullishType';
  path: string;
  parent?: JSOSParserElement;
  value: null;
}

export type JSOSParserElement =
  | JSOSParserNodeElement
  | JSOSParserStringElement
  | JSOSParserNumericElement
  | JSOSParserListElement
  | JSOSParserBooleanElement
  | JSOSParserNullishElement;

export type JSOSParserDynamicType = 'DynamicType';

export interface JSOSParserResolver {
  type: JSOSParserElementType | JSOSParserDynamicType;
  check(definition: JSOSParserDefinition): boolean;
  resolve(
    definition: JSOSParserDefinition,
    context: JSOSParserContext,
  ): JSOSParserElement;
}

export interface JSOSParserOptions<T = Record<string, any>> {
  elements: JSOSParserElement[];
  resolvers: JSOSParserResolver[];
  makeContext?(context: JSOSParserContext): T;
  context: JSOSParserContext | (JSOSParserContext & T);
}

export type JSOSParser = <T = Record<string, any>>(
  definition: JSOSParserDefinition,
  options?: Partial<JSOSParserOptions<T>>,
) => JSOSParserElement[];
