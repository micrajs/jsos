import { JSOSTransformerContext } from '../types';
import { JSOSParserElement } from '../../jsosParser/types';

export const findByPath = (context: JSOSTransformerContext) => (
  path: string,
  elements: JSOSParserElement[] = context.elements,
): JSOSParserElement | undefined => {
  for (const element of elements) {
    if (element.path === path) {
      return element;
    } else if (Array.isArray(element.value)) {
      const response = findByPath(context)(path, element.value);
      if (response) {
        return response;
      }
    }
  }

  return undefined;
};
