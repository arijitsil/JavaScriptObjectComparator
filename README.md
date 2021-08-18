# JavaScriptObjectComparator v1.0.1

This utility method conpares two Javascript objects and provides the following information as a javascript object:

1. Missing properties
2. Properties having Mismatch types
3. Properties having Mismatch values

## Installation

npm i --save object-diff-gen

## Example Usage

```import objectComparator from '@arijit.sil/object-diff-gen';

let incomingStructure = {
    deviceName: "A",
    device: { 
      id: 1,
      value: "3",  // type mistmatch
      prop1: "new type", // value mismatch
            // missing key
      signals: {
        rawType: "digital", // value mismatch
        rawValue: 3  // value mismatch
      }
    }
  };
  
  let baseStructure = {
    deviceName: "A",
    device: {
      id: 1,
      value: 3,
      prop1: "old type",
      prop2: "some value",
      signals: {
        rawType: "digitals",
        rawValue: 2
      }
    }
  };

  console.log(objectComparator([baseStructure, incomingStructure]));
  ```

  ## Example Output

  ```
  {
  missingkeys: [ 'device.prop2' ],
  mismatchValue: [
    'device',
    'device.value',
    'device.prop1',
    'device.prop2',
    'device.signals',
    'device.signals.rawType',
    'device.signals.rawValue'
  ],
  mismatchType: [ 'device.value', 'device.prop2' ]
}
  ```

  ## Reference Object

  Reference Object can be changed using the "ref" parameter to the function.
  By default 0th Object is considered for reference.

```
  objectComparator([baseStructure, incomingStructure], ref = 0 or 1)
  ```





