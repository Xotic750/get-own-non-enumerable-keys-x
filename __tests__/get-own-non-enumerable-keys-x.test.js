let getOwnNonEnumerableKeys;

const hasSymbolSupport = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
const ifSymbolsIt = hasSymbolSupport ? it : xit;

const testObj = {};
Object.defineProperty(testObj, '1', {
  value: 'first',
});

const definedsNonEnumerable = Object.keys(testObj).length === 0;
const ifDefinesNonEnumerable = definedsNonEnumerable ? it : xit;

describe('getOwnNonEnumerableKeys', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect(typeof getOwnNonEnumerableKeys).toBe('function');
  });

  it('should throw when target is null or undefined', function() {
    expect.assertions(1);
    expect(function() {
      getOwnNonEnumerableKeys();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      getOwnNonEnumerableKeys(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      getOwnNonEnumerableKeys(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should return empty array', function() {
    expect.assertions(1);
    expect(getOwnNonEnumerableKeys({bar: 1, foo: 2})).toStrictEqual([]);
  });

  ifDefinesNonEnumerable('should return non-enumerable own keys', function() {
    const objects = [
      1,
      true,
      'abc',
      [],
      Object.defineProperty({bar: 1, foo: 2}, 'x', {
        value: 'first',
      }),
      /ab/,
      new Date(),
      function() {},
    ];

    const expected = objects.map(function(object) {
      const obj = Object(object);
      const keys = Object.keys(obj);

      return Reflect.ownKeys(obj).filter(function(ownKey) {
        return keys.includes(ownKey) === false;
      });
    });

    const actual = objects.map(getOwnNonEnumerableKeys);

    expect(actual).toStrictEqual(expected);
  });

  ifSymbolsIt('should return non-enumerable own keys and symbols', function() {
    const s1 = Symbol('first');
    const obj = Object.defineProperty({bar: 1, foo: 2}, s1, {
      enumerable: true,
      value: 'first',
    });

    const s2 = Symbol('second');
    Object.defineProperty(obj, s2, {
      enumerable: false,
      value: 'second',
    });

    const keys = Object.keys(obj);
    const syms = Object.getOwnPropertySymbols(obj).filter(function(sym) {
      return obj.propertyIsEnumerable(sym);
    });

    const result = Reflect.ownKeys(obj).filter(function(ownKey) {
      return keys.includes(ownKey) === false && syms.includes(ownKey) === false;
    });

    expect(getOwnNonEnumerableKeys(obj)).toStrictEqual(result);
  });
});
