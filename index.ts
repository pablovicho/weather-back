import type { Request, Response } from "express";
import express from "express";
import likes from "./api/likes.js";
import weather from "./api/weather";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.get("/api", weather);
// app.use("/likes", likes);
app.get("/likes", likes);

app.get("/", (req: Request, res: Response) => {
  res.send("Api running");
});

mongoose
  .connect(process.env.URI!, {dbName: "weather"})
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}`))
  )
  .catch((error) => console.log(error.message));
