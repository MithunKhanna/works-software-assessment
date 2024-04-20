import express,{ Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;


app.get("/", (req: any, res: any) => {
  res.send("<h1>Hi from my project</h1>")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
