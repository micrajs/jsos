<div align="center">
  <img src="https://raw.githubusercontent.com/micrajs/jsos/latest/.config/assets/logo.png" width="25%">
</div>

<h1 align="center">JSOS - JavaScript Object Schema</h1>

<p align="center">
  <img alt="version" src="https://img.shields.io/npm/v/@micra/jsos.svg">
  <img alt="issues" src="https://img.shields.io/github/issues/micrajs/jsos.svg">
  <img alt="prs" src="https://img.shields.io/github/issues-pr/micrajs/jsos.svg">
</p>

<hr />

## About

This package includes a parser and transformer for this custom JS object schema structure.

## Installation

```sh
yarn add -D jsos
```

## Usage

### jsosParser

The parser receives the JS object schema definition and creates an abstract tree.

#### Example

```typescript
const definitions = {
  colors: {
    blue: {
      100: '#00f',
    },
  },
};

const elements = jsosParser(definitions);
```

The generated tree becomes:

```json
[
  {
    "type": "NodeType",
    "path": "",
    "value": [
      {
        "type": "NodeType",
        "path": "colors",
        "value": [
          {
            "type": "NodeType",
            "path": "colors.blue",
            "value": [
              {
                "type": "StringType",
                "path": "colors.blue.100",
                "value": "#00f"
              }
            ]
          }
        ]
      }
    ]
  }
]
```

#### Elements types

```typescript
interface JSOSParserNodeElement {
  type: 'NodeType';
  path: string;
  value: JSOSParserElement[];
}

interface JSOSParserStringElement {
  type: 'StringType';
  path: string;
  value: string;
}

interface JSOSParserNumericElement {
  type: 'NumericType';
  path: string;
  value: number;
}

interface JSOSParserListElement {
  type: 'ListType';
  path: string;
  value: JSOSParserElement[];
}

interface JSOSParserBooleanElement {
  type: 'BooleanType';
  path: string;
  value: boolean;
}

interface JSOSParserNullishElement {
  type: 'NullishType';
  path: string;
  value: null;
}
```

Other types:

```typescript
interface JSOSParserRootElement {
  type: 'NodeType';
  path: '';
  value: JSOSParserElement[];
}

type JSOSParentElement =
  | JSOSParserNodeElement
  | JSOSParserListElement;

type JSOSPrimitiveElement =
  | JSOSParserStringElement
  | JSOSParserNumericElement
  | JSOSParserNullishElement
  | JSOSParserBooleanElement;
```

### jsosTransformer

The transformer is responsible for navigating through the tree generated by the parser and transform it into something useful. It accepts a tree as the first argument and a set of options as the second.

To transform the tree, you can pass transformer functions to through the option object's `transformers` in the form of an object:

```typescript
{
  transformers: {
    NodeType() { /* ... */ },
    StringType() { /* ... */ },
    NumericType() { /* ... */ },
    ListType() { /* ... */ },
    BooleanType() { /* ... */ },
    NullishType() { /* ... */ },
  }
}
```

> Note: To define your transformers, you can import the `NODE_TYPE`, `STRING_TYPE`, `NUMERIC_TYPE`, `LIST_TYPE`, `BOOLEAN_TYPE` and `NULLISH_TYPE` variables and use them to define the keys.

#### Example

```typescript
const elements = jsosParser(definitions);
const content = jsosTransformer(elements, {
  transformers: {
    [STRING_TYPE](element, { append, parseValue }) {
      append(
        `--${element.path.split('.').join('-').toLowerCase()}: ${parseValue(
          element.value,
        )};`,
      );
    },
  },
});
```

Results in:

```css
--colors-blue-100: #00f;
```

#### jsosTransformer options

```typescript
interface JSOSTransformerOptions<T = Record<string, any>> {
  valueParsers: Record<string, ValueParser>;
  transformers: Partial<
    Record<JSOSParserElementType, JSOSTransformerFunction<T>>
  >;
  makeContext?(context: JSOSTransformerContext): T;
  context: JSOSTransformerContext | (JSOSTransformerContext & T);
}
```

#### Transformers' context

```typescript
interface JSOSTransformerContext {
  elements: JSOSParserElement[];
  transform: JSOSTransformer;
  transformers: Record<JSOSParserElementType, JSOSTransformerFunction>;
  parseValue: ParseValue;
  content(): string;
  prepend(value: string): string;
  append(value: string): string;
  findByPath(
    path: string,
    elements?: JSOSParserElement[],
  ): JSOSParserElement | undefined;
}
```

## Test coverage

<table style="width:100%">
  <tr>
      <td>92.18% </td>
      <td>Statements</td>
      <td>271/294</td>
  </tr>
  <tr>
      <td>71.86% </td>
      <td>Branches</td>
      <td>120/167</td>
  </tr>
  <tr>
      <td>80.88% </td>
      <td>Functions</td>
      <td>55/68</td>
  </tr>
  <tr>
      <td>91.97% </td>
      <td>Lines</td>
      <td>229/249</td>
  </tr>
</table>

## Author

- [Olavo Amorim Santos](https://github.com/olavoasantos)
