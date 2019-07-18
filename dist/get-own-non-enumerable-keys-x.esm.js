function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

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
 * @throws {TypeError} - If target is null or undefined.
 * @returns {Array} The non-enumerable own keys.
 */

var getOwnNonEnumerableKeys = function getOwnNonEnumerableKeys(target) {
  var _this = this;

  var object = toObject(target);
  var enumKeys = objectKeys(object);
  var enumSyms = getOEPS(object);
  return filter(reflectOwnKeys(object), function (key) {
    _newArrowCheck(this, _this);

    return arrayIncludes(enumKeys, key) === false && arrayIncludes(enumSyms, key) === false;
  }.bind(this));
};

export default getOwnNonEnumerableKeys;

//# sourceMappingURL=get-own-non-enumerable-keys-x.esm.js.map