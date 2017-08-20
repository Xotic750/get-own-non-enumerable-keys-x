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

describe('getOwnNonEnumerableKeys', function () {
  it('is a function', function () {
    expect(typeof getOwnNonEnumerableKeys).toBe('function');
  });

  it('should throw when target is not an object', function () {
    expect(function () {
      getOwnNonEnumerableKeys();
    }).toThrow();

    expect(function () {
      getOwnNonEnumerableKeys(void 0);
    }).toThrow();

    expect(function () {
      getOwnNonEnumerableKeys(null);
    }).toThrow();

    expect(function () {
      getOwnNonEnumerableKeys(1);
    }).toThrow();

    expect(function () {
      getOwnNonEnumerableKeys(true);
    }).toThrow();

    expect(function () {
      getOwnNonEnumerableKeys('');
    }).toThrow();
  });

  it('should return non-enumerable own keys', function () {
    var obj = { bar: 1, foo: 2 };
    Object.defineProperty(obj, '1', {
      value: 'first'
    });

    var keys = Object.keys(obj);
    var ownKeys = Reflect.ownKeys(obj);
    var result = ownKeys.filter(function _filter(ownKey) {
      return keys.includes(ownKey) === false;
    });

    expect(getOwnNonEnumerableKeys(obj).sort()).toEqual(result.sort());
  });

  ifSymbolsIt('should return non-enumerable own keys including symbols', function () {
    var obj = { bar: 1, foo: 2 };
    var symbol = Symbol('first');
    Object.defineProperty(obj, symbol, {
      value: 'first'
    });

    var keys = Object.keys(obj);
    var ownKeys = Reflect.ownKeys(obj);
    var result = ownKeys.filter(function _filter(ownKey) {
      return keys.includes(ownKey) === false;
    });

    expect(getOwnNonEnumerableKeys(obj).sort()).toEqual(result.sort());
  });
});
