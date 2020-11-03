import { VideoServer } from './src/videoServer';
import { Routes } from './src/routes';

let app = new VideoServer().getApp();
const route = new Routes(app);
route.home();

export { app };
