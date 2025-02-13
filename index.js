import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from 'path';
import bodyParser from "body-parser";
import cors from 'cors'
import gameRoute from "./routes/game.js";

const app = express();
dotenv.config();

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "timepass" })
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => console.log(err));
};

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1", gameRoute);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "dist", "index.html"));
  });
}


app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`server is running on port ${process.env.PORT}`);
});