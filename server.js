// import { VideoServer } from './src/videoServer';
// import { Routes } from './src/routes';
var vs = require('./src/videoServer');
var routes = require('./src/routes');

let app = new vs.VideoServer().getApp();
const route = new routes.Routes(app);
route.home();

