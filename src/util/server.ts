import express, { Request, Response, NextFunction } from 'express';
import connectToMongoDB from '../repository/mongoDBConnection';
import bodyParser from 'body-parser';
import router from '../route/route';

function createServer() {

    const app = express();

    connectToMongoDB();

    app.use(bodyParser.json());

    app.use('/api/v1/note', router);

    return app;
}

export default createServer;

