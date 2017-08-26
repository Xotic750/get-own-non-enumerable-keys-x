/**
 * @file Like Reflect.ownKeys but gets only non-enumerable properties.
 * @version 1.2.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-own-non-enumerable-keys-x
 */

'use strict';

var assertIsObject = require('assert-is-object-x');
var objectKeys = require('object-keys-x');
var reflectOwnKeys = require('reflect-own-keys-x');
var filter = require('array-filter-x');
var includes = require('array-includes-x');

var getONEK = function getOwnNonEnumerableKeys(target) {
  assertIsObject(target);
  var keys = objectKeys(target);
  var ownKeys = reflectOwnKeys(target);
  return filter(ownKeys, function _filter(ownKey) {
    return includes(keys, ownKey) === false;
  });
};

/**
 * This method returns only the non-enumerable own keys of an object.
 * Note: It is not possible the get a list of non-enumerable own keys in older
 * environments and therefore an empty array will be returned.
 *
 * @param {Object} target - The target.
 * @throws {typeError} - If target is a primitive.
 * @returns {Array} The non-enumerable own keys.
 * @example
 * var getOwnNonEnumerableKeys = require('get-own-non-enumerable-keys-x');
 *
 * var obj = { bar: 1, foo: 2 };
 * Object.defineProperty(obj, '1', {
 *   value: 'first'
 * });
 *
 * var symbol = Symbol('first');
 * Object.defineProperty(obj, symbol, {
 *   value: 'second'
 * });
 *
 * getOwnNonEnumerableKeys(obj); // ['1', symbol]
 */
module.exports = getONEK;
