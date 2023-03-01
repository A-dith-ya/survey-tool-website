/// <reference path="../custom.d.ts" />
import express from "express";
import users from "./routes/users";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "./config";
import cookieParser from "cookie-parser";

export const app = express();
app.use(
  cors({
    origin: config.REACT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", users);

export default app;
