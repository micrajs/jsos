import {
  JSOSParserBooleanElement,
  JSOSParserListElement,
  JSOSParserNodeElement,
  JSOSParserNullishElement,
  JSOSParserNumericElement,
  JSOSParserStringElement,
} from '../types';

export const createNodeElement = ({
  path,
  value,
  parent = undefined,
}: Partial<JSOSParserNodeElement>): JSOSParserNodeElement => ({
  parent,
  type: 'NodeType',
  path: path ?? '',
  value: value ?? [],
});

export const createStringElement = ({
  path,
  value,
  parent = undefined,
}: Partial<JSOSParserStringElement>): JSOSParserStringElement => ({
  parent,
  type: 'StringType',
  path: path ?? '',
  value: value ?? '',
});

export const createNumericElement = ({
  path,
  value,
  parent = undefined,
}: Partial<JSOSParserNumericElement>): JSOSParserNumericElement => ({
  parent,
  type: 'NumericType',
  path: path ?? '',
  value: value ?? NaN,
});

export const createListElement = ({
  path,
  value,
  parent = undefined,
}: Partial<JSOSParserListElement>): JSOSParserListElement => ({
  parent,
  type: 'ListType',
  path: path ?? '',
  value: value ?? [],
});

export const createBooleanElement = ({
  path,
  value,
  parent = undefined,
}: Partial<JSOSParserBooleanElement>): JSOSParserBooleanElement => ({
  parent,
  type: 'BooleanType',
  path: path ?? '',
  value: value ?? true,
});

export const createNullishElement = ({
  path,
  value,
  parent = undefined,
}: Partial<JSOSParserNullishElement>): JSOSParserNullishElement => ({
  parent,
  type: 'NullishType',
  path: path ?? '',
  value: value ?? null,
});
