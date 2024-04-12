import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { DB_CONNECT } from "./utils/Constants.js";
import apiRoute, { apiProtected } from "./routes/api.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(DB_CONNECT)
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

const port = 8000;

app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, apiProtected);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
