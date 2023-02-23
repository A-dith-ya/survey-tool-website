import express from "express";
import users from "./routes/users";
import bodyParser from "body-parser";

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", users);

export default app;
