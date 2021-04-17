import AsyncStorage from '@react-native-async-storage/async-storage';
import Operator from './operators';

export async function checkCollection(db, name) {
  try {
    let value = await AsyncStorage.getItem(db + '/' + name);
    if (value != null) {
      return JSON.parse(value);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export function isObject(object) {
  return object instanceof Object && object.constructor.name === 'Object';
}

export function isArray(arr) {
  return arr.constructor === Array;
}

export function generateID() {
  return (
    (new Date().getTime() / 1000).toString(16).substr(-4) +
    Math.random().toString(16).substr(2, 12)
  );
}

export const queryMatch = (query, target) => {
  if (!query || !Object.keys(query).length) {
    return true;
  }

  for (let field of Object.keys(query)) {
    let val = query[field];
    let tar = target[field];

    if (val instanceof RegExp) {
      if (!val.test(tar)) {
        return false;
      }
    } else if (isObject(val)) {
      for (let op of Object.keys(val)) {
        if (Operator._checkExist(op) && !Operator[op](val[op], tar)) {
          return false;
        }
      }
    } else if (val !== tar) {
      return false;
    }
  }

  return true;
};
