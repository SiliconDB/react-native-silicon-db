'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ops = ['$eq', '$gt', '$gte', '$in', '$lt', '$lte', '$ne', '$nin'];

var isNotNumber = function isNotNumber(val) {
  return typeof val !== 'number';
};

var Operator = function () {
  function Operator() {
    _classCallCheck(this, Operator);
  }

  _createClass(Operator, null, [{
    key: '$eq',
    value: function $eq(val, tar) {
      return tar === val;
    }
  }, {
    key: '$gt',
    value: function $gt(val, tar) {
      if (isNotNumber(val)) throw new Error("'$gt' value must be a number");
      return tar > val;
    }
  }, {
    key: '$gte',
    value: function $gte(val, tar) {
      if (isNotNumber(val)) throw new Error("'$gte' value must be a number");
      return tar >= val;
    }
  }, {
    key: '$in',
    value: function $in(val, tar) {
      if (!(val instanceof Array)) throw new Error("'$in' value must be an array");
      return val.includes(tar);
    }
  }, {
    key: '$lt',
    value: function $lt(val, tar) {
      if (isNotNumber(val)) throw new Error("'$lt' value must be a number");
      return tar < val;
    }
  }, {
    key: '$lte',
    value: function $lte(val, tar) {
      if (isNotNumber(val)) throw new Error("'$lte' value must be a number");
      return tar <= val;
    }
  }, {
    key: '$ne',
    value: function $ne(val, tar) {
      return tar !== val;
    }
  }, {
    key: '$nin',
    value: function $nin(val, tar) {
      if (!(val instanceof Array)) throw new Error("'$nin' value must be an array");
      return !val.includes(tar);
    }
  }, {
    key: '_checkExist',
    value: function _checkExist(op) {
      if (ops.includes(op)) {
        return true;
      }
      throw new Error("unknown operator: '" + op + "'");
    }
  }]);

  return Operator;
}();

exports.default = Operator;