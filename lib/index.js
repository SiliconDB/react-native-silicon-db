'use strict';

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _functions = require('./functions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import _ from 'lodash';
// var RNFS = require('react-native-fs');


var SiliconDB = function SiliconDB(config) {
  var _this = this;

  _classCallCheck(this, SiliconDB);

  this.collection = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log("coll");
              _context.next = 3;
              return (0, _functions.checkCollection)(_this.db, name);

            case 3:
              _this.data = _context.sent;
              return _context.abrupt('return', new _collection2.default(_this.db, name, _this.data));

            case 5:
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

  this.db = config.database;
  this.encryption = config.encryption || false;
  this.data = [];
  // console.log("init", _.VERSION);
  var path = RNFS.DocumentDirectoryPath + '/test.txt';

  // write the file
  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8').then(function (success) {
    console.log('FILE WRITTEN!');
  }).catch(function (err) {
    console.log(err.message);
  });
};

module.exports = store;