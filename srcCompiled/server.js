"use strict";

var _videoServer = require("./videoServer.js");

var _routes = require("./routes.js");

let app = new _videoServer.VideoServer().getApp();
const route = new _routes.Routes(app);
route.home();