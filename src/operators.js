const ops = ['$eq', '$gt', '$gte', '$in', '$lt', '$lte', '$ne', '$nin'];

const isNotNumber = (val) => {
  return typeof val !== 'number';
};

export default class Operator {
  static $eq(val, tar) {
    return tar === val;
  }

  static $gt(val, tar) {
    if (isNotNumber(val)) throw new Error("'$gt' value must be a number");
    return tar > val;
  }

  static $gte(val, tar) {
    if (isNotNumber(val)) throw new Error("'$gte' value must be a number");
    return tar >= val;
  }

  static $in(val, tar) {
    if (!(val instanceof Array))
      throw new Error("'$in' value must be an array");
    return val.includes(tar);
  }

  static $lt(val, tar) {
    if (isNotNumber(val)) throw new Error("'$lt' value must be a number");
    return tar < val;
  }

  static $lte(val, tar) {
    if (isNotNumber(val)) throw new Error("'$lte' value must be a number");
    return tar <= val;
  }

  static $ne(val, tar) {
    return tar !== val;
  }

  static $nin(val, tar) {
    if (!(val instanceof Array))
      throw new Error("'$nin' value must be an array");
    return !val.includes(tar);
  }

  static _checkExist(op) {
    if (ops.includes(op)) {
      return true;
    }
    throw new Error("unknown operator: '" + op + "'");
  }
}
