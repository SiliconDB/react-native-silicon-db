'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _asyncStorage = require('@react-native-async-storage/async-storage');

var _asyncStorage2 = _interopRequireDefault(_asyncStorage);

var _reactNative = require('react-native');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _functions = require('./functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /* eslint-disable eqeqeq */


var Collection = function Collection(db, name, data) {
  var _this = this;

  _classCallCheck(this, Collection);

  this.insert = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(value) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(0, _functions.isObject)(value)) {
                _context.next = 10;
                break;
              }

              if (!value.id) value.id = (0, _functions.generateID)();
              _this.data.unshift(value);
              console.log(_this.data);
              _context.next = 6;
              return _this.storeData(_this.data);

            case 6:
              _reactNative.DeviceEventEmitter.emit(_this.collectionKey, {
                type: 'insert',
                data: value
              });
              return _context.abrupt('return', value.id);

            case 10:
              if (!(0, _functions.isArray)(value)) {
                _context.next = 13;
                break;
              }

              _context.next = 14;
              break;

            case 13:
              throw new Error('Type error');

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.update = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, obj) {
      var getObj, newObj, newData;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!((0, _functions.isObject)(obj) && id)) {
                _context2.next = 16;
                break;
              }

              _context2.next = 3;
              return _this.findById(id);

            case 3:
              getObj = _context2.sent;
              newObj = Object.assign(getObj, obj);
              _context2.next = 7;
              return _this._del(id);

            case 7:
              newData = _context2.sent;

              newData.unshift(newObj);
              _this.data = newData;
              _context2.next = 12;
              return _this.storeData(_this.data);

            case 12:
              _reactNative.DeviceEventEmitter.emit(_this.collectionKey, {
                type: 'update',
                data: newObj
              });
              console.log(_this.data);
              _context2.next = 17;
              break;

            case 16:
              throw new Error('Missing parameters');

            case 17:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this);
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }();

  this.getAll = function () {
    return _this.data;
  };

  this.query = function (query) {
    return _lodash2.default.filter(_this.data, function (o) {
      return (0, _functions.queryMatch)(query, o);
    });
    //ex
    // let users = await this.Users.query(
    //   {
    //     varsta: {
    //       $lte: 21,
    //     },
    //   }
    // );
    // console.log(users);
  };

  this.find = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(obj) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(0, _functions.isObject)(obj)) {
                _context3.next = 4;
                break;
              }

              return _context3.abrupt('return', _lodash2.default.filter(_this.data, obj));

            case 4:
              throw new Error('Not an object !');

            case 5:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this);
    }));

    return function (_x4) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.findById = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!id) {
                _context4.next = 4;
                break;
              }

              return _context4.abrupt('return', _lodash2.default.find(_this.data, { id: id }));

            case 4:
              throw new Error('No id!');

            case 5:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x5) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.remove = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!id) {
                _context5.next = 8;
                break;
              }

              _this.data = _lodash2.default.filter(_this.data, function (o) {
                return o.id != id;
              });
              _context5.next = 4;
              return _this.storeData(_this.data);

            case 4:
              _reactNative.DeviceEventEmitter.emit(_this.collectionKey, { type: 'remove', data: id });
              return _context5.abrupt('return', _this.data);

            case 8:
              throw new Error('No id!');

            case 9:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, _this);
    }));

    return function (_x6) {
      return _ref5.apply(this, arguments);
    };
  }();

  this._del = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!id) {
                _context6.next = 5;
                break;
              }

              _this.data = _lodash2.default.filter(_this.data, function (o) {
                return o.id != id;
              });
              return _context6.abrupt('return', _this.data);

            case 5:
              throw new Error('No id!');

            case 6:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x7) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.drop = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _this.data = [];
            _context7.next = 3;
            return _asyncStorage2.default.removeItem(_this.collectionKey);

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  }));

  this.storeData = function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(val) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _asyncStorage2.default.setItem(_this.collectionKey, JSON.stringify(val));

            case 3:
              _context8.next = 8;
              break;

            case 5:
              _context8.prev = 5;
              _context8.t0 = _context8['catch'](0);

              console.log(_context8.t0);

            case 8:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, _this, [[0, 5]]);
    }));

    return function (_x8) {
      return _ref8.apply(this, arguments);
    };
  }();

  this.name = name;
  this.db = db;
  this.data = data || [];
  this.collectionKey = this.db + '/' + this.name;
  this.onChange = function (callback) {
    return _reactNative.DeviceEventEmitter.addListener(_this.collectionKey, callback);
  };
};

exports.default = Collection;