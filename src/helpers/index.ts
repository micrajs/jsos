import {
  BOOLEAN_TYPE,
  LIST_TYPE,
  NODE_TYPE,
  NULLISH_TYPE,
  NUMERIC_TYPE,
  STRING_TYPE,
} from '../jsosParser/constants';
import {
  JSOSParserElement,
  JSOSParentElement,
  JSOSPrimitiveElement,
  JSOSParserNullishElement,
  JSOSParserBooleanElement,
  JSOSParserListElement,
  JSOSParserNumericElement,
  JSOSParserStringElement,
  JSOSParserNodeElement,
} from '../jsosParser/types';

export const isRootElement = (
  element: JSOSParserElement,
): element is JSOSParserNodeElement => element.path === '';
export const isNodeElement = (
  element: JSOSParserElement,
): element is JSOSParserNodeElement => element.type === NODE_TYPE;
export const isStringElement = (
  element: JSOSParserElement,
): element is JSOSParserStringElement => element.type === STRING_TYPE;
export const isNumericElement = (
  element: JSOSParserElement,
): element is JSOSParserNumericElement => element.type === NUMERIC_TYPE;
export const isListElement = (
  element: JSOSParserElement,
): element is JSOSParserListElement => element.type === LIST_TYPE;
export const isBooleanElement = (
  element: JSOSParserElement,
): element is JSOSParserBooleanElement => element.type === BOOLEAN_TYPE;
export const isNullishElement = (
  element: JSOSParserElement,
): element is JSOSParserNullishElement => element.type === NULLISH_TYPE;
export const isPrimitiveElement = (
  element: JSOSParserElement,
): element is JSOSPrimitiveElement => !Array.isArray(element.value);
export const isParentElement = (
  element: JSOSParserElement,
): element is JSOSParentElement => Array.isArray(element.value);

export const findElement = (
  elements: JSOSParserElement[],
  check: (element: JSOSParserElement) => boolean,
): JSOSParserElement | undefined => {
  for (const element of elements) {
    if (check(element)) {
      return element;
    } else if (isParentElement(element)) {
      return findElement(element.value, check);
    }
  }

  return undefined;
};

export const filterElements = (
  elements: JSOSParserElement[],
  check: (element: JSOSParserElement) => boolean,
): JSOSParserElement[] =>
  elements
    .map<JSOSParserElement | undefined>((element) => {
      if (check(element)) {
        if (isParentElement(element)) {
          return {
            ...element,
            value: filterElements(element.value.slice(), check),
          };
        }

        return { ...element };
      }

      return undefined;
    })
    .filter(Boolean) as JSOSParserElement[];

export const flattenElements = (
  elements: JSOSParserElement[],
  partial: JSOSParserElement[] = [],
) => {
  elements.forEach((element) => {
    if (isPrimitiveElement(element) || isListElement(element)) {
      partial.push({ ...element });
    } else {
      flattenElements(element.value, partial);
    }
  });

  return partial;
};
