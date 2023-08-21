import express from "express";
import thingsRouter from "./routers/thingsRouters";

const app = express();

app.use("/things", thingsRouter);

export default app;
