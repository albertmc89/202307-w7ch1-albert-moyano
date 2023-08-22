import express from "express";
import morgan from "morgan";
import thingsRouter from "./routers/thingsRouters.js";

const app = express();

app.use(morgan("dev"));

app.use("/things", thingsRouter);

export default app;
