import { jsosParser } from '..';
import { LIST_TYPE } from '../constants';
import { createListElement } from '../elements';
import { JSOSParserDefinition, JSOSParserResolver } from '../types';

export const listResolver: JSOSParserResolver = {
  type: LIST_TYPE,
  check(definition) {
    return Array.isArray(definition);
  },
  resolve(definition: Array<JSOSParserDefinition>, context) {
    const el = createListElement({
      path: context.breadcrumbs,
      value: definition.map((value) => {
        const [element] = jsosParser(value, { context });
        return element;
      }),
    });

    return el;
  },
};
