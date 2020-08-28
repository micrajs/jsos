/* istanbul ignore file */
export const PKG = '@micra/jsos';
export const NAME = 'jsos';
export const VERSION = '0.0.1';

export * from './jsosParser';
export * from './jsosParser/constants';
export * from './jsosParser/types';
export * from './jsosParser/context/createParserContext';
export * from './jsosParser/context/get';
export * from './jsosParser/elements';
export * from './jsosParser/helpers/isPrimitive';
export * from './jsosParser/helpers/replaceDeep';
export * from './jsosParser/resolvers';
export * from './jsosParser/resolvers/booleanResolver';
export * from './jsosParser/resolvers/dynamicResolver';
export * from './jsosParser/resolvers/listResolver';
export * from './jsosParser/resolvers/nodeResolver';
export * from './jsosParser/resolvers/nullishResolver';
export * from './jsosParser/resolvers/numericResolver';
export * from './jsosParser/resolvers/stringResolver';
export * from './jsosTransformer';
export * from './jsosTransformer/types';
export * from './jsosTransformer/context/createTransformerContext';
export * from './jsosTransformer/context/findByPath';
export * from './jsosTransformer/context/parseValue';
export * from './jsosTransformer/context/writer';
export * from './jsosTransformer/transformers';
