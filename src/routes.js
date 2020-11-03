import express from 'express';
import path from 'path';

export class Routes {

    constructor(app) {
        this.app = app;
        this.setStaticDir();
    }

    home() {
        this.app.get('/', (request, response) => {
            response.sendFile(path.join(__dirname, '../public', 'index.html'));
        });
    }

    setStaticDir() {
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

}