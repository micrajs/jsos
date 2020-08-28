import { listResolver } from './listResolver';
import { nodeResolver } from './nodeResolver';
import { JSOSParserResolver } from '../types';
import { stringResolver } from './stringResolver';
import { booleanResolver } from './booleanResolver';
import { dynamicResolver } from './dynamicResolver';
import { nullishResolver } from './nullishResolver';
import { numericResolver } from './numericResolver';

export const defaultResolvers: JSOSParserResolver[] = [
  stringResolver,
  numericResolver,
  booleanResolver,
  nullishResolver,
  listResolver,
  nodeResolver,
  dynamicResolver,
];
