
import type { Request, Response } from "express";
import express from "express";


const app = express();
const port = 8080;
app.use(express.json());

// app.post("/forecast", (req: Request, res: Response) => {
// //create new forecast post
// });

app.get("/", (req: Request, res: Response) => {
res.send("Api running");
});

app.get("/forecast", (req: Request, res: Response) => {
//get all posts
});

app.get("/forecast/:day", (req: Request, res: Response) => {
//get a specific forecast
});

app.listen(port, () => {
console.log(`Listening on port ${port}...`);
});