import { jsosParser } from '../jsosParser';
import { jsosTransformer } from '../jsosTransformer';
import { STRING_TYPE } from '../jsosParser/constants';

describe('integration tests', () => {
  const definitions = {
    colors: {
      blue: {
        100: '#00f',
      },
    },
  };

  it('should create a css variable', () => {
    const elements = jsosParser(definitions);
    const content = jsosTransformer(elements, {
      transformers: {
        [STRING_TYPE](element, { content, parseValue }) {
          content.append(
            `--${element.path.split('.').join('-').toLowerCase()}: ${parseValue(
              element.value,
            )};`,
          );
        },
      },
    });

    expect(content).toBe('--colors-blue-100: #00f;');
  });
});
