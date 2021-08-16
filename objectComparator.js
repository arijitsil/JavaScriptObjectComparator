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

function generateObjectValue(anyObject) {
  let valueObject = {};
  let level = 0;
  const getLevel = (prevValue, someObject, level) => {
    Object.keys(someObject).map((value) => {
      let arrayKey;
      if (typeof prevValue === "undefined") {
        arrayKey = value;
      } else {
        arrayKey = prevValue + "." + value;
      }
      valueObject[arrayKey] = someObject[value];
      if (typeof someObject[value] === "object") {
        return getLevel(arrayKey, someObject[value], ++level);
      }
      return null;
    });
  };
  getLevel(undefined, anyObject, level);
  return valueObject;
}
function generateObjectLevel(anyObject) {
  let lvlObject = {};
  let level = 0;
  const getLevel = (prevValue, someObject, level) => {
    Object.keys(someObject).map((value) => {
      let arrayKey;
      if (typeof prevValue === "undefined") {
        arrayKey = value;
      } else {
        arrayKey = prevValue + "." + value;
      }
      lvlObject[arrayKey] = level;
      if (typeof someObject[value] === "object") {
        return getLevel(arrayKey, someObject[value], ++level);
      }
      return null;
    });
  };
  getLevel(undefined, anyObject, level);
  return lvlObject;
}
const keyComparator = (key1, key2, diff) => {
  diff.missingkeys = [];
  Object.keys(key1).map((key) => {
    if (key1[key] !== key2[key]) {
      diff.missingkeys.push(key);
    }
    return null;
  });
};

const valueComparator = (value1, value2, diff) => {
  diff.mismatchValue = [];
  diff.mismatchType = [];
  Object.keys(value1).map((key) => {
    if (value1[key] !== value2[key]) {
      diff.mismatchValue.push(key);
    }
    if (typeof value1[key] !== typeof value2[key]) {
      diff.mismatchType.push(key);
    }
    return null;
  });
};

const objectComparator = (objArray, ref = 0) => {
  if (objArray.length !== 2) {
    return "Please provide array of size 2 for comparison";
  }
  if (objArray[ref] === objArray[!ref]) {
    return "It's same object";
  }
  const diff = {};
  const key1 = generateObjectLevel(objArray[ref === 0 ? 0 : 1]);
  const key2 = generateObjectLevel(objArray[ref === 0 ? 1 : 0]);
  keyComparator({ ...key1 }, { ...key2 }, diff);
  const value1 = generateObjectValue(objArray[ref === 0 ? 0 : 1]);
  const value2 = generateObjectValue(objArray[ref === 0 ? 1 : 0]);
  valueComparator({ ...value1 }, { ...value2 }, diff);
  return diff;
};
console.log(objectComparator([baseStructure, incomingStructure]));
