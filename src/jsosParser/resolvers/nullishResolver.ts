import { NULLISH_TYPE } from '../constants';
import { JSOSParserResolver } from '../types';
import { createNullishElement } from '../elements';

export const nullishResolver: JSOSParserResolver = {
  type: NULLISH_TYPE,
  check(definition) {
    return definition == null;
  },
  resolve(_, { breadcrumbs }) {
    return createNullishElement({
      value: null,
      path: breadcrumbs,
    });
  },
};
