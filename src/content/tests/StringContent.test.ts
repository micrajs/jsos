import { StringContent } from '../StringContent';

describe('StringContent tests', () => {
  it('should accept an initial value on the constructor', () => {
    const content = new StringContent('initial value');

    expect(content.value).toBe('initial value');
  });

  it('should append content to the value', () => {
    const content = new StringContent();

    content.append('value');

    expect(content.value).toBe('value');
  });

  it('should append content to an initial value', () => {
    const content = new StringContent('initial');

    content.append(' value');

    expect(content.value).toBe('initial value');
  });

  it('should prepend content to an initial value', () => {
    const content = new StringContent('initial');

    content.prepend('value of ');

    expect(content.value).toBe('value of initial');
  });
});
