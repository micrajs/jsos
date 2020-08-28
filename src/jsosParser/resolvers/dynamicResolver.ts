import { jsosParser } from '..';
import { DYNAMIC_TYPE } from '../constants';
import { JSOSParserDynamicDefinition, JSOSParserResolver } from '../types';

export const dynamicResolver: JSOSParserResolver = {
  type: DYNAMIC_TYPE,
  check(definition) {
    return typeof definition === 'function';
  },
  resolve(definition: JSOSParserDynamicDefinition, context) {
    const [elements] = jsosParser(definition(context), {
      context,
    });

    return elements;
  },
};
