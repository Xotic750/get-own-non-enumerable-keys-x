'use strict';

var getOwnNonEnumerableKeys;
if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');
  if (typeof JSON === 'undefined') {
    JSON = {};
  }
  require('json3').runInContext(null, JSON);
  require('es6-shim');
  var es7 = require('es7-shim');
  Object.keys(es7).forEach(function (key) {
    var obj = es7[key];
    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  getOwnNonEnumerableKeys = require('../../index.js');
} else {
  getOwnNonEnumerableKeys = returnExports;
}

var hasSymbolSupport = typeof Symbol === 'function' && typeof Symbol('') === 'symbol';
var ifSymbolsIt = hasSymbolSupport ? it : xit;

var testObj = {};
Object.defineProperty(testObj, '1', {
  value: 'first'
});

var definedsNonEnumerable = Object.keys(testObj).length === 0;
var ifDefinesNonEnumerable = definedsNonEnumerable ? it : xit;

describe('getOwnNonEnumerableKeys', function () {
  it('is a function', function () {
    expect(typeof getOwnNonEnumerableKeys).toBe('function');
  });

  it('should throw when target is null or undefined', function () {
    expect(function () {
      getOwnNonEnumerableKeys();
    }).toThrow();

    expect(function () {
      getOwnNonEnumerableKeys(void 0);
    }).toThrow();

    expect(function () {
      getOwnNonEnumerableKeys(null);
    }).toThrow();
  });

  it('should return empty array', function () {
    expect(getOwnNonEnumerableKeys({ bar: 1, foo: 2 })).toEqual([]);
  });

  ifDefinesNonEnumerable('should return non-enumerable own keys', function () {
    var objects = [
      1,
      true,
      'abc',
      [],
      Object.defineProperty({ bar: 1, foo: 2 }, 'x', {
        value: 'first'
      }),
      /ab/,
      new Date(),
      function () {}
    ];

    var expected = objects.map(function (object) {
      var obj = Object(object);
      var keys = Object.keys(obj);
      return Reflect.ownKeys(obj).filter(function (ownKey) {
        return keys.includes(ownKey) === false;
      });
    });

    var actual = objects.map(getOwnNonEnumerableKeys);

    expect(actual).toEqual(expected);
  });

  ifSymbolsIt('should return non-enumerable own keys and symbols', function () {
    var s1 = Symbol('first');
    var obj = Object.defineProperty({ bar: 1, foo: 2 }, s1, {
      enumerable: true,
      value: 'first'
    });

    var s2 = Symbol('second');
    Object.defineProperty(obj, s2, {
      enumerable: false,
      value: 'second'
    });

    var keys = Object.keys(obj);
    var syms = Object.getOwnPropertySymbols(obj).filter(function (sym) {
      // eslint-disable-next-line no-prototype-builtins
      return obj.propertyIsEnumerable(sym);
    });

    var result = Reflect.ownKeys(obj).filter(function (ownKey) {
      return keys.includes(ownKey) === false && syms.includes(ownKey) === false;
    });

    expect(getOwnNonEnumerableKeys(obj)).toEqual(result);
  });
});
