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
 */
export default function getOwnNonEnumerableKeys(target) {
  const object = toObject(target);
  const enumKeys = objectKeys(object);
  const enumSyms = getOEPS(object);

  return filter(reflectOwnKeys(object), function(key) {
    return arrayIncludes(enumKeys, key) === false && arrayIncludes(enumSyms, key) === false;
  });
}
