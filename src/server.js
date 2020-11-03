import { VideoServer } from './videoServer.js';
import { Routes } from './routes.js';

let app = new VideoServer().getApp();
const route = new Routes(app);
route.home();

