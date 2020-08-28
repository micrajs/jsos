import { jsosTransformer } from '..';
import {
  BOOLEAN_TYPE,
  LIST_TYPE,
  NODE_TYPE,
  NULLISH_TYPE,
  NUMERIC_TYPE,
  STRING_TYPE,
} from '../../jsosParser/constants';

describe('jsosTransformer tests', () => {
  describe('transformers tests', () => {
    it('should transform a StringType element', () => {
      const spy = jest.fn();
      jsosTransformer(
        [
          {
            type: STRING_TYPE,
            path: '',
            value: 'value',
          },
        ],
        {
          transformers: {
            [STRING_TYPE]: spy,
          },
        },
      );

      expect(spy).toHaveBeenCalled();
    });

    it('should transform a NumericType element', () => {
      const spy = jest.fn();
      jsosTransformer(
        [
          {
            type: NUMERIC_TYPE,
            path: '',
            value: 123,
          },
        ],
        {
          transformers: {
            [NUMERIC_TYPE]: spy,
          },
        },
      );

      expect(spy).toHaveBeenCalled();
    });

    it('should transform a BooleanType element', () => {
      const spy = jest.fn();
      jsosTransformer(
        [
          {
            type: BOOLEAN_TYPE,
            path: '',
            value: true,
          },
        ],
        {
          transformers: {
            [BOOLEAN_TYPE]: spy,
          },
        },
      );

      expect(spy).toHaveBeenCalled();
    });

    it('should transform a NullishType element', () => {
      const spy = jest.fn();
      jsosTransformer(
        [
          {
            type: NULLISH_TYPE,
            path: '',
            value: null,
          },
        ],
        {
          transformers: {
            [NULLISH_TYPE]: spy,
          },
        },
      );

      expect(spy).toHaveBeenCalled();
    });

    it('should transform a NodeType element', () => {
      const spy = jest.fn();
      jsosTransformer(
        [
          {
            type: NODE_TYPE,
            path: '',
            value: [],
          },
        ],
        {
          transformers: {
            [NODE_TYPE]: spy,
          },
        },
      );

      expect(spy).toHaveBeenCalled();
    });

    it("should transform a NodeType element's children", () => {
      const spy = jest.fn();
      jsosTransformer(
        [
          {
            type: NODE_TYPE,
            path: '',
            value: [
              {
                type: STRING_TYPE,
                path: 'key',
                value: 'value',
              },
            ],
          },
        ],
        {
          transformers: {
            [STRING_TYPE]: spy,
          },
        },
      );

      expect(spy).toHaveBeenCalled();
    });

    it('should transform a ListType element', () => {
      const spy = jest.fn();
      jsosTransformer(
        [
          {
            type: LIST_TYPE,
            path: '',
            value: [],
          },
        ],
        {
          transformers: {
            [LIST_TYPE]: spy,
          },
        },
      );

      expect(spy).toHaveBeenCalled();
    });

    it("should transform a ListType element's children", () => {
      const spy = jest.fn();
      jsosTransformer(
        [
          {
            type: LIST_TYPE,
            path: '',
            value: [
              {
                type: STRING_TYPE,
                path: '',
                value: 'value',
              },
            ],
          },
        ],
        {
          transformers: {
            [STRING_TYPE]: spy,
          },
        },
      );

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('parse value tests', () => {
    it('should call the value parser', () => {
      jsosTransformer(
        [
          {
            type: NODE_TYPE,
            path: '',
            value: [
              {
                type: NODE_TYPE,
                path: 'colors',
                value: [
                  {
                    type: STRING_TYPE,
                    path: 'colors.blue',
                    value: '#00f',
                  },
                ],
              },
            ],
          },
          {
            type: STRING_TYPE,
            path: '',
            value: 'get::colors.blue',
          },
        ],
        {
          transformers: {
            [STRING_TYPE](element, { parseValue }) {
              parseValue(element.value as string, {
                get(value) {
                  expect(value).toBe('colors.blue');

                  return value as string;
                },
              });
            },
          },
        },
      );
    });
  });
});
