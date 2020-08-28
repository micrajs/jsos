import { STRING_TYPE } from '../constants';
import { JSOSParserResolver } from '../types';
import { createStringElement } from '../elements';

export const stringResolver: JSOSParserResolver = {
  type: STRING_TYPE,
  check(definition) {
    return typeof definition === 'string';
  },
  resolve(definition: string, { breadcrumbs }) {
    return createStringElement({
      value: definition,
      path: breadcrumbs,
    });
  },
};
