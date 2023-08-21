import express from "express";
import thingsRouter from "./routers/thingsRouters.js";

const app = express();

app.use("/things", thingsRouter);

export default app;
