import express from "express";
import morgan from "morgan";
import { endPointNotFound, generalErrorHandler } from "./middlewares/error.js";
import thingsRouter from "./routers/thingsRouters.js";

const app = express();

app.use(morgan("dev"));

app.use("/things", thingsRouter);

app.use(endPointNotFound);
app.use(generalErrorHandler);

export default app;
