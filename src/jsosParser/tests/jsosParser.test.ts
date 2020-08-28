import { jsosParser } from '..';
import {
  BOOLEAN_TYPE,
  LIST_TYPE,
  NODE_TYPE,
  NULLISH_TYPE,
  NUMERIC_TYPE,
  STRING_TYPE,
} from '../constants';

describe('jsosParser tests', () => {
  describe('parser types tests', () => {
    it('should parse a string type', () => {
      const elements = jsosParser('value');

      expect(elements).toMatchObject([
        {
          type: STRING_TYPE,
          path: '',
          value: 'value',
        },
      ]);
    });

    it('should parse a numeric type', () => {
      const elements = jsosParser(123);

      expect(elements).toMatchObject([
        {
          type: NUMERIC_TYPE,
          path: '',
          value: 123,
        },
      ]);
    });

    it('should parse a boolean type', () => {
      const elements = jsosParser(false);

      expect(elements).toMatchObject([
        {
          type: BOOLEAN_TYPE,
          path: '',
          value: false,
        },
      ]);
    });

    it('should parse a nullish type with null value', () => {
      const elements = jsosParser(null);

      expect(elements).toMatchObject([
        {
          type: NULLISH_TYPE,
          path: '',
          value: null,
        },
      ]);
    });

    it('should parse a nullish type with undefined value', () => {
      const elements = jsosParser(undefined);

      expect(elements).toMatchObject([
        {
          type: NULLISH_TYPE,
          path: '',
          value: null,
        },
      ]);
    });

    it('should parse a node type', () => {
      const elements = jsosParser({});

      expect(elements).toMatchObject([
        {
          type: NODE_TYPE,
          path: '',
          value: [],
        },
      ]);
    });

    it('should parse a node type with string child', () => {
      const elements = jsosParser({
        key: 'value',
      });

      expect(elements).toMatchObject([
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
      ]);
    });

    it('should parse a node type with multiple children', () => {
      const elements = jsosParser({
        string: 'value',
        numeric: 123,
      });

      expect(elements).toMatchObject([
        {
          type: NODE_TYPE,
          path: '',
          value: [
            {
              type: STRING_TYPE,
              path: 'string',
              value: 'value',
            },
            {
              type: NUMERIC_TYPE,
              path: 'numeric',
              value: 123,
            },
          ],
        },
      ]);
    });

    it('should parse a deep node type', () => {
      const elements = jsosParser({
        deep: {
          value: 123,
        },
      });

      expect(elements).toMatchObject([
        {
          type: NODE_TYPE,
          path: '',
          value: [
            {
              type: NODE_TYPE,
              path: 'deep',
              value: [
                {
                  type: NUMERIC_TYPE,
                  path: 'deep.value',
                  value: 123,
                },
              ],
            },
          ],
        },
      ]);
    });

    it('should parse a list type', () => {
      const elements = jsosParser([]);

      expect(elements).toMatchObject([
        {
          type: LIST_TYPE,
          path: '',
          value: [],
        },
      ]);
    });

    it('should parse a list type with elements', () => {
      const elements = jsosParser(['value']);

      expect(elements).toMatchObject([
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
      ]);
    });

    it('should parse a dynamic definition', () => {
      const elements = jsosParser(() => 'value');

      expect(elements).toMatchObject([
        {
          type: STRING_TYPE,
          path: '',
          value: 'value',
        },
      ]);
    });

    it('should parse a dynamic definition referencing a given value', () => {
      const elements = jsosParser({
        colours: {
          blue: '#00f',
        },
        background: ({ get }) => get('colours.blue'),
      });

      expect(elements).toMatchObject([
        {
          type: 'NodeType',
          path: '',
          value: [
            {
              type: 'NodeType',
              path: 'colours',
              value: [
                { type: 'StringType', path: 'colours.blue', value: '#00f' },
              ],
            },
            {
              type: 'StringType',
              path: 'background',
              value: 'get::colours.blue',
            },
          ],
        },
      ]);
    });

    it('should parse a dynamic definition referencing a set of values', () => {
      const elements = jsosParser({
        colours: {
          blue: '#00f',
        },
        background: ({ get }) => get('colours'),
      });

      expect(elements).toMatchObject([
        {
          type: 'NodeType',
          path: '',
          value: [
            {
              type: 'NodeType',
              path: 'colours',
              value: [
                { type: 'StringType', path: 'colours.blue', value: '#00f' },
              ],
            },
            {
              type: 'NodeType',
              path: 'background',
              value: [
                {
                  type: 'StringType',
                  path: 'background.blue',
                  value: 'get::colours.blue',
                },
              ],
            },
          ],
        },
      ]);
    });

    it('should parse a dynamic definition returning a deep value', () => {
      const elements = jsosParser(() => ({
        deep: {
          value: [123],
        },
      }));

      expect(elements).toMatchObject([
        {
          type: NODE_TYPE,
          path: '',
          value: [
            {
              type: NODE_TYPE,
              path: 'deep',
              value: [
                {
                  type: LIST_TYPE,
                  path: 'deep.value',
                  value: [
                    {
                      type: NUMERIC_TYPE,
                      path: 'deep.value',
                      value: 123,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]);
    });
  });
});
