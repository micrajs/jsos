import { ObjectContent } from '../ObjectContent';

describe('ObjectContent tests', () => {
  it('should accept an initial value on the constructor', () => {
    const content = new ObjectContent({ key: 'value' });

    expect(content.value).toMatchObject({
      key: 'value',
    });
  });

  it('should append a value to the object', () => {
    const content = new ObjectContent();

    content.append('key', 'value');

    expect(content.value).toMatchObject({
      key: 'value',
    });
  });

  it('should append a nested value to the object', () => {
    const content = new ObjectContent();

    content.append('nested.key', 'value');

    expect(content.value).toMatchObject({
      nested: {
        key: 'value',
      },
    });
  });

  it('should append a nested value to a nested object', () => {
    const content = new ObjectContent({ nested: { key: 'value' } });

    content.append('nested.new-key', 'value');

    expect(content.value).toMatchObject({
      nested: {
        key: 'value',
        'new-key': 'value',
      },
    });
  });

  it('should not remove a value if it already exists', () => {
    const content = new ObjectContent({ nested: { key: 'value' } });

    expect(() => content.append('nested.key.value.is', 'value')).toThrow();
  });

  it('should not allow to append content using an empty path', () => {
    const content = new ObjectContent();

    expect(() => content.append('', 'value')).toThrow();
  });

  it('should prepend a value to the object', () => {
    const content = new ObjectContent();

    content.prepend('key', 'value');

    expect(content.value).toMatchObject({
      key: 'value',
    });
  });

  it('should prepend a nested value to the object', () => {
    const content = new ObjectContent();

    content.prepend('nested.key', 'value');

    expect(content.value).toMatchObject({
      nested: {
        key: 'value',
      },
    });
  });

  it('should prepend a nested value to a nested object', () => {
    const content = new ObjectContent({ nested: { key: 'value' } });

    content.prepend('nested.new-key', 'value');

    expect(content.value).toMatchObject({
      nested: {
        key: 'value',
        'new-key': 'value',
      },
    });
  });

  it('should not remove a value if it already exists', () => {
    const content = new ObjectContent({ nested: { key: 'value' } });

    expect(() => content.prepend('nested.key.value.is', 'value')).toThrow();
  });

  it('should not allow to prepend content using an empty path', () => {
    const content = new ObjectContent();

    expect(() => content.prepend('', 'value')).toThrow();
  });
});
