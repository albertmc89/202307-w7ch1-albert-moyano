import express from "express";
import { deleteThingById, getThings } from "../controller/thingsController.js";

const thingsRouter = express.Router();

thingsRouter.get("/", getThings);
thingsRouter.delete("/:idThing", deleteThingById);

export default thingsRouter;
