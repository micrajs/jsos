import { BOOLEAN_TYPE } from '../constants';
import { JSOSParserResolver } from '../types';
import { createBooleanElement } from '../elements';

export const booleanResolver: JSOSParserResolver = {
  type: BOOLEAN_TYPE,
  check(definition) {
    return typeof definition === 'boolean';
  },
  resolve(definition: boolean, { breadcrumbs }) {
    return createBooleanElement({
      value: definition,
      path: breadcrumbs,
    });
  },
};
