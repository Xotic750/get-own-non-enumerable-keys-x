/**
 * @file Like Reflect.ownKeys but gets only non-enumerable properties.
 * @version 3.2.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-own-non-enumerable-keys-x
 */

const toObject = require('to-object-x');
const filter = require('array-filter-x');
const reflectOwnKeys = require('reflect-own-keys-x');
const arrayIncludes = require('array-includes-x');
const objectKeys = require('object-keys-x');
const getOEPS = require('get-own-enumerable-property-symbols-x');

/**
 * This method returns only the non-enumerable own keys of an object.
 * Note: It is not possible the get a list of non-enumerable own keys in older
 * environments and therefore an empty array will be returned.
 *
 * @param {object} target - The target.
 * @throws {typeError} - If target is null or undefined.
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
module.exports = function getOwnNonEnumerableKeys(target) {
  const object = toObject(target);
  const enumKeys = objectKeys(object);
  const enumSyms = getOEPS(object);

  return filter(reflectOwnKeys(object), function(key) {
    return arrayIncludes(enumKeys, key) === false && arrayIncludes(enumSyms, key) === false;
  });
};
