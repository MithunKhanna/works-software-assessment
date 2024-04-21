import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import connectToMongoDB from './repository/mongoDBConnection';
import router from './route/route';

const app = express();
const port = 8080;

// Connect to mongoDb
connectToMongoDB();

app.use(bodyParser.json());

app.use('/api/v1/note', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
