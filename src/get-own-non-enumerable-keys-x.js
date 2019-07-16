/**
 * @file Like Reflect.ownKeys but gets only non-enumerable properties.
 * @version 3.2.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module get-own-non-enumerable-keys-x
 */

import toObject from 'to-object-x';

import filter from 'array-filter-x';
import reflectOwnKeys from 'reflect-own-keys-x';
import arrayIncludes from 'array-includes-x';
import objectKeys from 'object-keys-x';
import getOEPS from 'get-own-enumerable-property-symbols-x';

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
export default function getOwnNonEnumerableKeys(target) {
  const object = toObject(target);
  const enumKeys = objectKeys(object);
  const enumSyms = getOEPS(object);

  return filter(reflectOwnKeys(object), function(key) {
    return arrayIncludes(enumKeys, key) === false && arrayIncludes(enumSyms, key) === false;
  });
}
