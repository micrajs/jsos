import { jsosParser } from '..';
import { NODE_TYPE } from '../constants';
import { createNodeElement } from '../elements';
import { JSOSParserNode, JSOSParserResolver } from '../types';

export const nodeResolver: JSOSParserResolver = {
  type: NODE_TYPE,
  check(definition) {
    return (
      typeof definition === 'object' &&
      definition != null &&
      !Array.isArray(definition)
    );
  },
  resolve(definition: JSOSParserNode, context) {
    const parent = createNodeElement({
      path: context.breadcrumbs,
      value: [],
    });

    for (const [key, entry] of Object.entries(definition)) {
      const breadcrumbs = context.breadcrumbs
        ? `${context.breadcrumbs}.${key}`
        : key;
      const [element] = jsosParser(entry, {
        context: { ...context, breadcrumbs },
      });
      parent.value.push(element);
    }

    return parent;
  },
};
