import type { Request, Response } from "express";
import express from "express";
import weather from "api/weather.js";
import connect from "config/db.js";
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use("/api", weather);

app.get("/", (req: Request, res: Response) => {
res.send("Api running");
});

connect(process.env.USER2, process.env.DB_PW);

app.listen(port, () => {
console.log(`Listening on port ${port}...`);
});