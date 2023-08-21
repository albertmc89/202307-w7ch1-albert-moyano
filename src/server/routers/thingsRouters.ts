import express from "express";
import getThings from "../controller/thingsController.js";

const thingsRouter = express.Router();

thingsRouter.get("/", getThings);

export default thingsRouter;
