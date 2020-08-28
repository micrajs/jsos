import { NUMERIC_TYPE } from '../constants';
import { JSOSParserResolver } from '../types';
import { createNumericElement } from '../elements';

export const numericResolver: JSOSParserResolver = {
  type: NUMERIC_TYPE,
  check(definition) {
    return definition != null && typeof definition === 'number';
  },
  resolve(definition: number, { breadcrumbs }) {
    return createNumericElement({
      value: definition,
      path: breadcrumbs,
    });
  },
};
