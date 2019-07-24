<a href="https://travis-ci.org/Xotic750/get-own-non-enumerable-keys-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/get-own-non-enumerable-keys-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a href="https://david-dm.org/Xotic750/get-own-non-enumerable-keys-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/get-own-non-enumerable-keys-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/get-own-non-enumerable-keys-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/get-own-non-enumerable-keys-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/get-own-non-enumerable-keys-x"
  title="npm version">
<img src="https://badge.fury.io/js/get-own-non-enumerable-keys-x.svg"
  alt="npm version" height="18">
</a>
<a href="https://www.jsdelivr.com/package/npm/get-own-non-enumerable-keys-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/get-own-non-enumerable-keys-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>

<a name="module_get-own-non-enumerable-keys-x"></a>

## get-own-non-enumerable-keys-x

Like Reflect.ownKeys but gets only non-enumerable properties.

wn-non-enumerable-keys-x--module.exports"></a>

### `module.exports(target)` ⇒ <code>Array</code> ⏏

This method returns only the non-enumerable own keys of an object.
Note: It is not possible the get a list of non-enumerable own keys in older
environments and therefore an empty array will be returned.

**Kind**: Exported function  
**Returns**: <code>Array</code> - The non-enumerable own keys.  
**Throws**:

- <code>typeError</code> - If target is null or undefined.

| Param  | Type                | Description |
| ------ | ------------------- | ----------- |
| target | <code>Object</code> | The target. |

**Example**

```js
import getOwnNonEnumerableKeys from 'get-own-non-enumerable-keys-x';

const obj = {bar: 1, foo: 2};
Object.defineProperty(obj, '1', {
  value: 'first',
});

const symbol = Symbol('first');
Object.defineProperty(obj, symbol, {
  value: 'second',
});

getOwnNonEnumerableKeys(obj); // ['1', symbol]
```
