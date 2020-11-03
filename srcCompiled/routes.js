"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Routes = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Routes {
  constructor(app) {
    this.app = app;
    this.setStaticDir();
  }

  home() {
    this.app.get('/', (request, response) => {
      response.sendFile(_path.default.join(__dirname, '../public', 'index.html'));
    });
  }

  setStaticDir() {
    this.app.use(_express.default.static(_path.default.join(__dirname, '../public')));
  }

}

exports.Routes = Routes;