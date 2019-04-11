/* global beforeAll test expect */

const _ = require('lodash');

_.mixin(require('../lodash.unwind'));

let object;

beforeAll(() => {
  object = [
    {
      regular: 'key',
      values: [{ l2: 1 }, { l2: 2 }, { l2: 3 }]
    }
  ];
});

test('return an array', () => {
  const test = _.unwind(object, 'values');

  expect(test).toBeInstanceOf(Array);
});

test('array has 3 elements', () => {
  const test = _.unwind(object, 'values');

  expect(test.length).toEqual(object[0].values.length);
  test.forEach(i => expect(i.values).toBeInstanceOf(Object));
});

test('a function can modify the way items are merged', () => {
  const test = _.unwind(object, 'values', _.merge);

  test.forEach((i) => {
    expect(i.l2).not.toBeNull();
    expect(i.values).toBeUndefined();
  });
});

test('a function can modify the way items are merged', () => {
  const test = _.unwind(object, 'regular', _.merge);

  expect(test.length).toEqual(1);
});
