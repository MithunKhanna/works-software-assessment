
import bodyParser from 'body-parser';
import connectToMongoDB from './repository/mongoDBConnection';
import router from './route/route';
import createServer from './util/server';

const app = createServer()
const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
