import {
  filterElements,
  findElement,
  flattenElements,
  isBooleanElement,
  isListElement,
  isNodeElement,
  isNullishElement,
  isNumericElement,
  isParentElement,
  isPrimitiveElement,
  isRootElement,
  isStringElement,
} from '../index';
import {
  BooleanElementFactory,
  ListElementFactory,
  NodeElementFactory,
  NullishElementFactory,
  NumericElementFactory,
  PrimitiveElementFactory,
  RootElementFactory,
  StringElementFactory,
} from '../../tests/helpers/factories';
import { STRING_TYPE } from '../../jsosParser/constants';

describe('isRootElement tests', () => {
  it('should return true if the given element is a root element', () => {
    const rootElement = RootElementFactory.make();
    expect(isRootElement(rootElement)).toBeTruthy();
  });

  it('should return false if the given element is not a root element', () => {
    const nonRootElement = NodeElementFactory.make();
    expect(isRootElement(nonRootElement)).toBeFalsy();
  });
});

describe('isNodeElement tests', () => {
  it('should return true if the given element is a node element', () => {
    const nodeElement = NodeElementFactory.make();
    expect(isNodeElement(nodeElement)).toBeTruthy();
  });

  it('should return false if the given element is not a node element', () => {
    const nonNodeElement = StringElementFactory.make();
    expect(isNodeElement(nonNodeElement)).toBeFalsy();
  });
});

describe('isStringElement tests', () => {
  it('should return true if the given element is a string element', () => {
    const stringElement = StringElementFactory.make();
    expect(isStringElement(stringElement)).toBeTruthy();
  });

  it('should return false if the given element is not a string element', () => {
    const nonStringElement = NodeElementFactory.make();
    expect(isStringElement(nonStringElement)).toBeFalsy();
  });
});

describe('isNumericElement tests', () => {
  it('should return true if the given element is a numeric element', () => {
    const numericElement = NumericElementFactory.make();
    expect(isNumericElement(numericElement)).toBeTruthy();
  });

  it('should return false if the given element is not a numeric element', () => {
    const nonNumericElement = NodeElementFactory.make();
    expect(isNumericElement(nonNumericElement)).toBeFalsy();
  });
});

describe('isListElement tests', () => {
  it('should return true if the given element is a list element', () => {
    const listElement = ListElementFactory.make();
    expect(isListElement(listElement)).toBeTruthy();
  });

  it('should return false if the given element is not a list element', () => {
    const nonListElement = NodeElementFactory.make();
    expect(isListElement(nonListElement)).toBeFalsy();
  });
});

describe('isBooleanElement tests', () => {
  it('should return true if the given element is a boolean element', () => {
    const booleanElement = BooleanElementFactory.make();
    expect(isBooleanElement(booleanElement)).toBeTruthy();
  });

  it('should return false if the given element is not a boolean element', () => {
    const nonBooleanElement = NodeElementFactory.make();
    expect(isBooleanElement(nonBooleanElement)).toBeFalsy();
  });
});

describe('isNullishElement tests', () => {
  it('should return true if the given element is a nullish element', () => {
    const nullishElement = NullishElementFactory.make();
    expect(isNullishElement(nullishElement)).toBeTruthy();
  });

  it('should return false if the given element is not a nullish element', () => {
    const nonNullishElement = NodeElementFactory.make();
    expect(isNullishElement(nonNullishElement)).toBeFalsy();
  });
});

describe('isPrimitiveElement tests', () => {
  it('should return true if the given element is a string element', () => {
    const stringElement = StringElementFactory.make();
    expect(isPrimitiveElement(stringElement)).toBeTruthy();
  });

  it('should return true if the given element is a numeric element', () => {
    const numericElement = NumericElementFactory.make();
    expect(isPrimitiveElement(numericElement)).toBeTruthy();
  });

  it('should return true if the given element is a boolean element', () => {
    const booleanElement = BooleanElementFactory.make();
    expect(isPrimitiveElement(booleanElement)).toBeTruthy();
  });

  it('should return true if the given element is a nullish element', () => {
    const nullishElement = NullishElementFactory.make();
    expect(isPrimitiveElement(nullishElement)).toBeTruthy();
  });

  it('should return false if the given element is node element', () => {
    const nodeElement = NodeElementFactory.make();
    expect(isPrimitiveElement(nodeElement)).toBeFalsy();
  });

  it('should return false if the given element is list element', () => {
    const listElement = ListElementFactory.make();
    expect(isPrimitiveElement(listElement)).toBeFalsy();
  });
});

describe('isParentElement tests', () => {
  it('should return true if the given element is node element', () => {
    const nodeElement = NodeElementFactory.make();
    expect(isParentElement(nodeElement)).toBeTruthy();
  });

  it('should return true if the given element is list element', () => {
    const listElement = ListElementFactory.make();
    expect(isParentElement(listElement)).toBeTruthy();
  });

  it('should return false if the given element is a string element', () => {
    const stringElement = StringElementFactory.make();
    expect(isParentElement(stringElement)).toBeFalsy();
  });

  it('should return false if the given element is a numeric element', () => {
    const numericElement = NumericElementFactory.make();
    expect(isParentElement(numericElement)).toBeFalsy();
  });

  it('should return false if the given element is a boolean element', () => {
    const booleanElement = BooleanElementFactory.make();
    expect(isParentElement(booleanElement)).toBeFalsy();
  });

  it('should return false if the given element is a nullish element', () => {
    const nullishElement = NullishElementFactory.make();
    expect(isParentElement(nullishElement)).toBeFalsy();
  });
});

describe('findElement tests', () => {
  it('should return an element based on a check function on a shallow list', () => {
    const randomElement = StringElementFactory.make();
    const elementToBeFound = StringElementFactory.make();
    const elements = [randomElement, elementToBeFound];

    const result = findElement(
      elements,
      (el) => el.path === elementToBeFound.path,
    );

    expect(result).toMatchObject(elementToBeFound);
  });

  it('should return an element based on a check function on a nested list', () => {
    const elementToBeFound = StringElementFactory.make();
    const elements = NodeElementFactory.make(1, {
      value: [elementToBeFound],
    });

    const result = findElement(
      elements,
      (el) => el.path === elementToBeFound.path,
    );

    expect(result).toMatchObject(elementToBeFound);
  });

  it('should return undefined if no elements match', () => {
    const elements = StringElementFactory.make(2);

    const result = findElement(elements, () => false);

    expect(result).toBeUndefined();
  });
});

describe('filterElements tests', () => {
  it('should filter elements based on a check function on a shallow list', () => {
    const stringElements = StringElementFactory.make(3);
    const numericElements = NumericElementFactory.make(3);
    const elements = [...stringElements, ...numericElements];

    const result = filterElements(elements, (el) => el.type === STRING_TYPE);

    expect(result).toMatchObject(stringElements);
  });

  it('should filter elements based on a check function on a nested list', () => {
    const stringElements = StringElementFactory.make(3);
    const numericElements = NumericElementFactory.make(3);
    const elements = RootElementFactory.make(1, {
      value: [...stringElements, ...numericElements],
    });

    const result = filterElements(
      elements,
      (el) => isStringElement(el) || isRootElement(el),
    );

    expect(result).toMatchObject(
      RootElementFactory.make(1, {
        value: stringElements,
      }),
    );
  });

  it('should return an empty array if no elements match', () => {
    const elements = StringElementFactory.make(2);

    const result = filterElements(elements, () => false);

    expect(result).toHaveLength(0);
  });
});

describe('flattenElements tests', () => {
  it('should flatten an element tree', () => {
    const primitiveChildren = PrimitiveElementFactory.get(2);
    const nestedPrimitiveChildren = PrimitiveElementFactory.get(2);
    const elements = RootElementFactory.make(1, {
      value: [
        ...primitiveChildren,
        NodeElementFactory.make({
          value: nestedPrimitiveChildren,
        }),
      ],
    });

    const result = flattenElements(elements);

    expect(result).toMatchObject([
      ...primitiveChildren,
      ...nestedPrimitiveChildren,
    ]);
  });
});
