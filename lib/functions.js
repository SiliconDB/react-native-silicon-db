'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryMatch = exports.checkCollection = undefined;

var checkCollection = exports.checkCollection = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(db, name) {
    var value;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _asyncStorage2.default.getItem(db + '/' + name);

          case 3:
            value = _context.sent;

            if (!(value != null)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt('return', JSON.parse(value));

          case 8:
            return _context.abrupt('return', []);

          case 9:
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', []);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));

  return function checkCollection(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.isObject = isObject;
exports.isArray = isArray;
exports.generateID = generateID;

var _asyncStorage = require('@react-native-async-storage/async-storage');

var _asyncStorage2 = _interopRequireDefault(_asyncStorage);

var _operators = require('./operators');

var _operators2 = _interopRequireDefault(_operators);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function isObject(object) {
  return object instanceof Object && object.constructor.name === 'Object';
}

function isArray(arr) {
  return arr.constructor === Array;
}

function generateID() {
  return (new Date().getTime() / 1000).toString(16).substr(-4) + Math.random().toString(16).substr(2, 12);
}

var queryMatch = exports.queryMatch = function queryMatch(query, target) {
  if (!query || !Object.keys(query).length) {
    return true;
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.keys(query)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var field = _step.value;

      var val = query[field];
      var tar = target[field];

      if (val instanceof RegExp) {
        if (!val.test(tar)) {
          return false;
        }
      } else if (isObject(val)) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = Object.keys(val)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var op = _step2.value;

            if (_operators2.default._checkExist(op) && !_operators2.default[op](val[op], tar)) {
              return false;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } else if (val !== tar) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
};