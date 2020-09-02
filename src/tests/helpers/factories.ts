/* istanbul ignore file */
import { factory, enumFactory } from 'node-factory';
import {
  JSOSPrimitiveElement,
  JSOSParserBooleanElement,
  JSOSParserListElement,
  JSOSParserNodeElement,
  JSOSParserNullishElement,
  JSOSParserNumericElement,
  JSOSParserStringElement,
} from '../../jsosParser/types';

export const NodeElementFactory = factory<JSOSParserNodeElement>((fake) => ({
  type: 'NodeType',
  path: fake.lorem.word(),
  value: [],
}));

export const RootElementFactory = factory<JSOSParserNodeElement>((fake) => ({
  type: 'NodeType',
  path: '',
  value: [],
}));

export const ListElementFactory = factory<JSOSParserListElement>((fake) => ({
  type: 'ListType',
  path: fake.lorem.word(),
  value: [],
}));

export const StringElementFactory = factory<JSOSParserStringElement>(
  (fake) => ({
    type: 'StringType',
    path: fake.lorem.word(),
    value: fake.internet.color(),
  }),
);

export const NumericElementFactory = factory<JSOSParserNumericElement>(
  (fake) => ({
    type: 'NumericType',
    path: fake.lorem.word(),
    value: fake.random.number(),
  }),
);

export const BooleanElementFactory = factory<JSOSParserBooleanElement>(
  (fake) => ({
    type: 'BooleanType',
    path: fake.lorem.word(),
    value: fake.random.boolean(),
  }),
);

export const NullishElementFactory = factory<JSOSParserNullishElement>(
  (fake) => ({
    type: 'NullishType',
    path: fake.lorem.word(),
    value: null,
  }),
);

export const PrimitiveElementFactory = enumFactory<JSOSPrimitiveElement>(
  (fake) => {
    const chance = fake.random.number(16);
    if (chance % 4 === 0) {
      return StringElementFactory.make();
    }
    if (chance % 4 === 1) {
      return NumericElementFactory.make();
    }
    if (chance % 4 === 2) {
      return NullishElementFactory.make();
    }
    if (chance % 4 === 3) {
      return BooleanElementFactory.make();
    }
  },
);

export const ParentElementFactory = enumFactory<JSOSPrimitiveElement>(
  (fake) => {
    const chance = fake.random.number(16);
    if (chance % 2 === 0) {
      return NodeElementFactory.make();
    }
    if (chance % 2 === 1) {
      return ListElementFactory.make();
    }
  },
);
